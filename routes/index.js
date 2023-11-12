require("dotenv").config({path : "../.env"})
const express = require('express')
const router = express.Router()
const db = require("../model/helper")
const OpenAI = require("openai")
const nodemailer = require('nodemailer') 
const openai = new OpenAI({apiKey : `${process.env.OPENAI_API_KEY}`})


// async function sendMail() {
//   const transporter = nodemailer.createTransport({
//     host: '127.0.0.1',
//     port: 1025,
//     secure: 'STARTTLS',
//     auth: {
//       user: 'greenarmyco@protonmail.com',
//       pass: 'Cv4lrfCgzz2EEvhnHnE9Dw'
//     }
//   })
//   const message = {
//     from: 'greenarmyco@protonmail.com ',
//     to: 'greenarmyco@protonmail.com',
//     subject: 'This time I\'m using Nodemailer',
//     text: 'This is my first email sent with Nodemailer and Mailtrap. Does it look good?',
//     html: '<p>This is my first email sent with Nodemailer and Mailtrap. Does it look good?</p>'
//   }
//   console.log("am I here?")
//   const info = await transporter.sendMail(message)
//   console.log(`Email sent: ${info.response}`) 
// }
// sendMail()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({msg: "we're here"})
});

router.get('/createmail/:id', async (req, res) =>{
  try {
    const magic = await getMagic(`${req.params.id}`)
    const data = await createMailWithParams(magic)
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
    res.send(201).send({message: `we will consider adding ${suggestion} to our magics`})
  } catch (err) {
    res.status(500).send(err);
  }
});

async function updateMsgsSentSpecificPolitician(id) {
  try {
    await db (`UPDATE politicians SET msgs_sent=msgs_sent+1 WHERE id=${id};`)
    res.send(200).send({message: "message count has been updated"})
  } catch (err) {
    res.status(500).send({});
  }
}
async function createMailWithParams(magic){

    const politician = await getRandomPolitician()
    const response = await getWebpage(politician.party)

    const webpage = response[0].webpage
    const name = politician.name
    const chosenMagic = magic.magic
    const data = { name : politician.name, webpage : response[0].webpage, message: "this is a test", magic: chosenMagic}
    
    return data
    
    // try {
    //   const completion = await openai.completions.create({
    //     model: "gpt-3.5-turbo-instruct",
    //     prompt: `Estamos escribiendo un mensaje a un politico.
    //     Analiza la página : ${webpage} para identificar puntos en relación con ${chosenMagic}.
    //     Identifica areas de preocupación y sugiere 1 acción para cambio positivo en relación con ${chosenMagic}.
    //     Compone un mensaje crítico, breve y directo dirigido a ${name}.
    //     Formato deseado:
    //     Entre 3 y 5 frases. Pretende que lo visto en la página web ha sido leído en las noticias.
    //     Hola {nombre}, le escribo sobre {tema}. Creo que {porqué es importante}, y quiero sugerir {política concreta}. 
    //     Cordialmente,
    //     Las Verdas Co.
    //     `,
    //     max_tokens: 250,
    //     best_of: 3,
    //     temperature: 0.2,  /// from 0 to 2 how funky do you want it
    //     frequency_penalty: 0.7, // from 2 (min) to -2 (max), how much do you want it to use new words 
    //   })

    //   const mail = completion.choices[0].text;
    //   const data = { name : name, message: mail}
    //   // await updateMsgsSentSpecificPolitician(politician.id) 
    //   return data

    // } catch (err) {
    //   return "chatGPT doesn't want to play"
    // }
    
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
