import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ChooseMagic({ setMagic }) {
  
  const handleClick = async event => {
    await setMagic(event.target.value);
    }; 
  
  return (
    <div> CHOOSE YOUR MAGIC

        <button><img src="cloud.png" value={1} onClick={(e) => handleClick(e)}/></button>
        
        <button value={1} onClick={(e) => setMagic(e.target.value)} > </button>
        <button value={2} onClick={(e) => setMagic(e.target.value)} > </button> 
        <button value={3} onClick={(e) => setMagic(e.target.value)} > </button>
    </div>
  )
}
