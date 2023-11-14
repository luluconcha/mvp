import React from 'react'
import {useState} from 'react'
import {Link} from 'react-router-dom'

export default function Suggestions() {
    const [error, setError] = useState("")
    const [input, setInput] = useState("")
    const [message, setMessage] = useState("")

async function handleSuggestion() {
    try {
        const response = await fetch("/api/suggestions", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ suggestion : input})
        });
        if (!response.ok) throw new Error(`Oops! ${response.status} ${response.statusText}`);
        setMessage("thank you!")
        setTimeout(() => setMessage(""), 1000)
    } catch (error) {
        setError(error);
        setMessage("the gods have rejected your suggestion");
    } finally {
        setInput("");
    }
    }

const handleInput = event => {
    setInput(event.target.value);
};

const handleSubmit = event => {
    event.preventDefault();
    setError("");
    handleSuggestion();
};

  return (
    <div>Suggestions <br/><br/>

        <textarea id="suggestions" type="text" value={input} onChange={e => handleInput(e)}></textarea> <br/><br/>
            <button type="submit" onClick={e => handleSubmit(e)}> BURN IT </button><br/><br/>
            <br/>
            {message}
            
            <br/><br/>
        <Link id="homebutton" to="/"><button> go home </button> </Link>
    </div>
  )
}
