import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './layout/navbar/Navbar.component'
import { CtxProvider } from './context/context'
import Prueba from './components/Prueba/Prueba'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CtxProvider>
        <Router>
          <Navbar/>
            <Prueba/>
          <Routes>
          </Routes>
        </Router>
      </CtxProvider>
    </>
  )
}

export default App
