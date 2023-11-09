import React from 'react'
import OpenAI from "openai"
import 'dotenv/config'

// const {OpenAI} = require("openai");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const openai = new OpenAI({apiKey: `${OPENAI_API_KEY}`});

async function createMail(){
  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo",
    prompt: "Escribeme un mensaje para un senador criticandole de sus pocos esfuerzos. Ha de ser corto.",
    max_tokens: 250,
    temperature: 1.2,  /// from 0 to 2 how funky do you want it
    frequency_penalty: -0.7, // using new words
  })
const mail = completion.choices[0].text;
console.log(mail)
}

// createMail();






// async function getDatasetFromGobByTheme() {
//     try {
//       const response = await fetch(`https://datos.gob.es/apidata/catalog/dataset/theme/medio-ambiente?_sort=title&_pageSize=10&_page=0`)
//       if (!response.ok) throw new Error(`Oops! ${response.status} ${response.statusText}`)
//       const dataset = await response.json()
//       console.log(dataset)
//     }
//     catch(e) {
//       setError(e.message)
//     }
//     finally {
//       setLoading(false);
//     };
//   }

//  async function getSenadors() {
//     try {
//       const res = await fetch("/api/senadors");
//       if (!res.ok) throw new Error(`Oops! ${res.status} ${res.statusText}`);
//       const listSens = await res.json();
//       console.log("in app.jsx res was jsoned : " + listSens)
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }


export default function SendMailPage() {
  return (
    <div>Are you ready?

    <button onClick={() => createMail()}></button>  
    </div>
    
  )
}
