import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './layout/navbar/Navbar.component'
import { CtxProvider } from './context/context'
import LoginCard from './components/LoginCard/LoginCard'
import Signup from './components/signUpCard/Signup'
import PopUp from './components/PopUps/PopUp'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CtxProvider>
        <Router>
          <Navbar />
          {/* <LoginCard />*/}
          <Signup />
          {/* <PopUp status={true} message={'Usuario registrado con exito.'} />
          <PopUp status={false} message={'Error ha pasado algo'} /> */}
          <Routes>
          </Routes>
        </Router>
      </CtxProvider>
    </>
  )
}

export default App
