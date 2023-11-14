import './App.css'
import {Route, Routes, Link} from 'react-router-dom'
import About from "./pages/About"
import SendMailPage from './pages/SendMailPage'
import MainMenu from "./pages/MainMenu"
import Suggestions from "./pages/Suggestions"
import TotalMsgs from "./components/TotalMsgs"
// import { Animated, Text, View, StyleSheet, Button, SafeAreaView } from 'react-native'
import { useRef } from 'react'



function App() {

  return (
    <div>
  
     <Routes>
      
        <Route path="/createmail" element={<SendMailPage/>} >
        <Route path="/createmail/:id" element={<SendMailPage/>} />
        </Route>
        <Route path="/about" element={<About/>} />
        <Route path="/" element={<MainMenu />} />
        <Route path="/suggestions" element={<Suggestions/>} />
        

     </Routes>
     <footer>
     <div className="total_msgs">
        <TotalMsgs></TotalMsgs>
     </div>
     </footer>
  
     
    </div>
  )
}

export default App;
