const express = require('express');
const router = express.Router();
const db = require("../model/helper");
require("dotenv").config();
const {OpenAI} = require("openai");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const openai = new OpenAI({apiKey: `${OPENAI_API_KEY}`});

/* GET home page. */
// router.get('/', function(req, res, next) {
// res.send('index', { title: 'Express' });
// });

// async function getPoliticians(req, res) {
//   try {
//     const results = await db("SELECT * FROM politicians ORDER BY id ASC;");
//     res.send(results.data);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// }
// router.get("/politicians", (req, res, next) => next());

// router.get('/politicians', async function(req, res, next) {
// res.send()
// })

// async function createMail(){
//   const completion = await openai.completions.create({
//     model: "gpt-3.5-turbo",
//     prompt: "Escribeme un mensaje para un senador criticandole de sus pocos esfuerzos. Ha de ser corto.",
//     max_tokens: 250,
//     temperature: 1.2,  /// from 0 to 2 how funky do you want it
//     frequency_penalty: -0.7, // using new words
//   })
// const mail = completion.choices[0].text;
// console.log(mail)
// }

// createMail();
// router.use(getPoliticians);

module.exports = router;
