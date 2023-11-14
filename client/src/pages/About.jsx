import React from 'react'
import {Link} from 'react-router-dom'


export default function About() {
  return (
    <div className="about">
       <h2> The Green Army Co. mission</h2>
        <p className="about_text"> You know when the world is ending, and some people have all the power, and they do nothing about it? 
          So you ask "what could *I* do about it?" and someone says "contact your local representative!" Sure, you'll try that.
          And you do it maybe once but it's such a hassle, and it feels so small, that you never do it again.
          Well! We've made it easy for you, like magic. Choose a theme and we'll send a message to a random politician from our database.
          All data used is publicly available. Artificial intelligence is in charge of looking at official webpages to craft a coherent message. 
          All you have to do, is click.
          <br />
          
         </p>
         <Link to="/createmail"> <button> click </button></Link>
        <Link id="homebutton" to="/"><button> go home </button> </Link>
    </div>
  )
}
