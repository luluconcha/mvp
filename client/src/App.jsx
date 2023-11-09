import { useState } from 'react'
import './App.css'
import SendMailPage from './pages/SendMailPage'
import Stats from './pages/Stats'

function App() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("")
  }



  return (
    <>
     Welcome to the Green Army Co.
     <button> u click me i give dataset </button>
     <div>
      <Link to="/"></Link>
     </div>
     <Routes>
        <Route path="/" element={<SendMailPage />} />

     </Routes>
    </>
  )
}

export default App
