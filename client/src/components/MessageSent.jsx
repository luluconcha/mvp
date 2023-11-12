import React from 'react'

export default function MessageSent({to, message}) {
  
  return (
    <div>
      Congratulations! 
      You sent a message to {to}.
      <p> The text was: {message} </p>
      <button type="reset"> x </button>
    </div>
  )
}
