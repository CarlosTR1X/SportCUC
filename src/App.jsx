import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './layout/navbar/Navbar.component'
import { CtxProvider, useCtx } from './context/context'
import LoginCard from './components/LoginCard/LoginCard'
import SignUpCard from './components/signUpCard/SignUpCard'
import PopUp from './components/PopUps/PopUp'
import AuthModalIndex from './layout/AuthModal/AuthModal'
import ProfileDropdown from './components/Buttons/DropdownProfile'



function App() {
  const { authSession, modalData } = useCtx()

  return (
    <>
      <CtxProvider>
        <Router>
          <Navbar />
          {/* <ProfileDropdown /> */}
          <div className='w-1/2'>
            <div className='text-white mb-10'>
              <span className='text-5xl '>Hola, {authSession ? "Usuario" : ""}</span>
            </div>
          </div>
          {/* <LoginCard />*/}
          {/*  <Signup /> */}
          {/* <AuthModalIndex /> */}
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
