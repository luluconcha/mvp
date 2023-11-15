import {Link} from 'react-router-dom'

export default function MessageSent({data, setAndClean}) {
  
  return (
    <div>
      Congratulations! <br /> <br />
      You chose: {data?.magic} <br />
      You sent a message to {data?.politician?.name} from {data?.politician?.organ}. <br />
      <p> The text was: {data?.message} </p>

      <button onClick={setAndClean}> x </button>
    </div>
  )
}
