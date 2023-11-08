import { useState } from 'react'
import './App.css'

function App() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    getDatasetFromGobByTheme()
    setLoading(true);
    setError("")
  }





  async function getDatasetFromGobByTheme() {
    try {
      const response = await fetch(`https://datos.gob.es/apidata/catalog/dataset/theme/medio-ambiente?_sort=title&_pageSize=10&_page=0`)
      if (!response.ok) throw new Error(`Oops! ${response.status} ${response.statusText}`)
      const dataset = await response.json()
      console.log(dataset)
    }
    catch(e) {
      setError(e.message)
    }
    finally {
      setLoading(false);
    };
  }

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


  return (
    <>
     Welcome to the Green Army Co.
     <button onClick={(e) => handleSubmit(e)}> u click me i give dataset </button>
     
    </>
  )
}

export default App
