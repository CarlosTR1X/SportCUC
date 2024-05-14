import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './layout/navbar/Navbar.component'
import { CtxProvider } from './context/context'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CtxProvider>
        <Router>
          <Navbar/>
          <Routes>
           
          </Routes>
        </Router>
      </CtxProvider>
    </>
  )
}

export default App
