import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import ChooseMagic from '../components/ChooseMagic.jsx'
import MessageSent from '../components/MessageSent.jsx'

export default function SendMailPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicID, setMagic] = useState(1)

async function getData() {
  try {
    const res = await fetch(`/api/createmail/${magicID}`)
    if (!res.ok) throw new Error(`Oops! ${res.status} ${res.statusText}`)
    const data = await res.json()
    setData(data)
    /// data.name, data.webpage, data.message
  } catch (error) {
    setError(error.message)
  } finally {
    setLoading(false)
  }
}

async function handleClick (event) {
  event.preventDefault()
  setLoading(true)
  setError("")
  getData()
}


  return (
    <div>Are you ready?

    {/* <button onClick={(e) => handleClick(e)}>THEBUTTONOFTRUTH</button> */}
    <img src="crystal_ball.gif" onClick={(e) => handleClick(e)}/>
    <div>
      <ChooseMagic setMagic={setMagic}></ChooseMagic>
      <div> you chose: {magicID}</div>
    </div>
    { error ? <div id="error"> {error} </div>
    : loading ? <img src="" /> 
    : <div> NOW LET'S SEE: <br /> {data?.name} {data?.webpage} {data?.message} {data?.magic}
      <MessageSent to={data?.name} message={data?.message}></MessageSent>
      </div>
    }

    <Link id="homebutton" to="/"><button> go home </button> </Link>
    </div>
    
  )
  
}


