require("dotenv").config({path : "../.env"})
const express = require('express')
const router = express.Router()
const db = require("../model/helper")
const OpenAI = require("openai")
const nodemailer = require('nodemailer') 
const openai = new OpenAI({apiKey : `${process.env.OPENAI_API_KEY}`})

// actually sends the email (uses nodemailer)
async function sendMail(email_address, text) {
  try {
     const transporter = nodemailer.createTransport({
        host: '127.0.0.1',
        port: 1025,
        secure: false,
        auth: {
          user: `${process.env.MASTER_EMAIL}`,
          pass: `${process.env.PROTONMAIL_SMTP_PASS}`
        },
        tls: {
          rejectUnauthorized: false
        }
      })
      // remove email_address and array brackets from "to:" to stop actually sending
    const message = {
      from: `${process.env.MASTER_EMAIL}`,
      to: [`${process.env.MASTER_EMAIL}`, `${email_address}`],
      subject: 'Un mensaje de Las Verdas Co.',
      text: `${text}`,
      html: `<p> ${text} </p><br /> <br />
            <h6> Las Verdas Co. es un proyecto estudiantil que da voz a gente que busca gritar. <h6>`
    }
    const info = await transporter.sendMail(message)
    const response = `Email sent: ${info.response}`
    console.log(response)
    return response

  } catch (err) {
    return err;
  }


}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({msg: "we're here"})
});

router.get('/createmail/:id', async (req, res) =>{
  try {
    const magic = await getMagic(`${req.params.id}`)
    const data = await createMailWithParams(magic)
    setTimeout(() => {
      sendMail(data.politician.email_address, data.message)
    }, 2000);
    res.send(data)
  } catch (err) {
    res.status(400).send(err)
  }
})

async function getMagic(id) {
  try {
    const res = await db(`SELECT * FROM magics WHERE id=${id};`)
    const magic = res.data[0]
    return magic
  } catch (err) {
    console.log({ msg : "magic broke"})
  }
}

async function getRandomPolitician() {
  try {
    const rando = await db("SELECT * FROM politicians ORDER BY RAND() LIMIT 1;")
    const politician = rando.data[0]
    return politician
  } catch (err) {
    console.log({ msg : "we could not get a random politician in this day and age"})
  }
}

async function getWebpage(party) {
  try {
    const webpage = await db(`SELECT webpage FROM parties WHERE party="${party}"`)
    return webpage.data
  } catch (err) {
    res.status(404).send({ msg : "no webpage was found"})
  }
}

router.post("/suggestions", async function(req, res) {
  const { suggestion } = req.body;
  try {
    await db(`INSERT INTO suggestions (suggestion) VALUES ('${suggestion}');`);
    res.status(201).send({message: `we will consider adding ${suggestion} to our magics`})
  } catch (err) {
    res.status(500).send(err);
  }
});

// this one is meant to be called inside createMailWithParams but it just makes it break.
async function updateMsgsSentSpecificPolitician(id) {
  try {
    await db(`UPDATE politicians SET msgs_sent=msgs_sent+1 WHERE id=${id};`)
    res.status(200).send({message: "message count has been updated"})
  } catch (err) {
    res.status(500).send({});
  }
}

async function createMailWithParams(magic){

    const politician = await getRandomPolitician()
    const response = await getWebpage(politician.party)
    await db (`UPDATE politicians SET msgs_sent=msgs_sent+1 WHERE id=${politician.id};`)
    const webpage = response[0].webpage
    const name = politician.name
    const chosenMagic = magic.magic

  
    // const data = { politician : politician, message: "this is a test", magic: chosenMagic}
    
    // return data
    
  ////// this part should be commmented out while testing (don't forget to leave out bottom curly bracket)
  ////// use the 2 lines above for tests

    try {
      const completion = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: `Estamos escribiendo un mensaje a un politico.
              Analiza la página : ${webpage} para identificar puntos en relación con ${chosenMagic}.
              Identifica areas de preocupación y sugiere 1 acción para cambio positivo en relación con ${chosenMagic}.
              Compone un mensaje crítico, breve y directo dirigido a ${name}.
              Formato deseado:
              Entre 3 y 5 frases. Pretende que lo visto en la página web ha sido leído en las noticias.
              Hola {nombre}, le escribo sobre {tema}. Creo que {porqué es importante}, y quiero sugerir {política concreta}. 
              Cordialmente,
              Las Verdas Co.
             `,
        max_tokens: 250,
        best_of: 3,
        temperature: 0.2,  /// from 0 to 2 how funky do you want it (actually makes it kinda loopy)
        frequency_penalty: 0.7, // from 2 (min) to -2 (max), how much do you want it to use new words 
      })

      const mail = completion.choices[0].text;
      const data = { politician : politician, message : mail, magic : chosenMagic }
      
      return data

    } catch (err) {
      return "chatGPT doesn't want to play"
    }
    
}

router.get("/politicians/total_msgs", async (req, res) => {
  try {
    const num = await db("SELECT SUM(msgs_sent) FROM politicians;")
    res.send(num.data[0]['SUM(msgs_sent)'])
  } catch (err) {
    res.status(404).send({ msg : "we could not get a random politician in this day and age"})
  }
}) 


module.exports = router;
