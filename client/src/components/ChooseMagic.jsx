import { useState, useEffect } from "react";


export default function ChooseMagic({ setMagic }) {
  useEffect(() => {
    setMagic();
  }, []);


  return (
    <div> CHOOSE YOUR MAGIC <br />

        <button id="magic1" value={1} onClick={(e) => setMagic(e.target.value)} >  </button><br />
        <button id="magic2" value={2} onClick={(e) => setMagic(e.target.value)} >  </button><br />
        <button id="magic3" value={3} onClick={(e) => setMagic(e.target.value)} >  </button><br />

       
    </div>
  )
}
