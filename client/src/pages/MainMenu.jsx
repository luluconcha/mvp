import React from 'react'
import {Link} from 'react-router-dom'

export default function MainMenu() {
  return (
    <div className="mainMenu">

        <h1> WELCOME TO THE GREEN ARMY CO.</h1>

        
        <Link to="/createmail"> SEND A MAIL </Link> <br/>
        <Link to="/about"> ABOUT THIS PROJECT </Link> <br/>
        <Link to="/suggestions"> GIVE US A SUGGESTION </Link>

    </div>
  )
}
