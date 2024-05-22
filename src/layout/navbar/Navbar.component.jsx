import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import BurguerButton from './burguerButton/BurguerButton.component'
import Button from '../../components/Buttons/Button'
import { useCtx } from '../../context/context'
import AuthModalIndex from '../AuthModal/AuthModal'
import ProfileDropdown from '../../components/Buttons/DropdownProfile'
import ModalContainer from '../../components/Modals/ModalContainer'

const Navbar = () => {
  const [active, setActive] = useState(false)
  const { authSession, setModalData, modalData, cerrarSesion, userSessionData } = useCtx()
  const [isOpen, setIsOpen] = useState(false);
  const [sessionOut, setSessionOut] = useState(false);

  const handleClick = () => {
    setActive(!active)
    setIsOpen(false);
  }

  const handleLoginButton = () => {
    setModalData({ open: true, modalId: "LOGIN" })
    setActive(false)
  }
  const handleSignupButton = () => {
    setModalData({ open: true, modalId: "SIGNUP" })
    setActive(false)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onCloseSessionOutModal = () => {
    setSessionOut(!sessionOut);
  }

  const singOut = async () => {
    try {

      console.log('sessionOut')
      const close = await cerrarSesion();
      if (close != null) throw new Error('Algo ha salido mal.')
      setActive(false);
      setIsOpen(false);
      setSessionOut(!sessionOut);
      setTimeout(() => {
        setSessionOut(false);
      }, 4000);
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      { /*** LOGIN AND SIGNUP POPUP */
        !authSession && modalData.open && (modalData.modalId === "LOGIN" || modalData.modalId === "SIGNUP") && <AuthModalIndex />
      }
      <NavContainer>
        <Link to="/"><h2>Sport</h2></Link>
        <div className={`links ${active ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/about">Sobre Nosotros</Link>
          {!authSession ? (<>
            <Link onClick={() => handleLoginButton()}>Login</Link>
            <Link onClick={() => handleSignupButton()}>Sign Up</Link>
          </>) : (<>
            {userSessionData.rol == 'admin' && <Link >Admin</Link>}
            <Link onClick={toggleDropdown}>Usuario</Link>

          </>
          )}

        </div>
        <div className='burguer'>
          <BurguerButton active={active} handleClick={handleClick} />
        </div>
        <BgDiv className={`initial ${active ? ' active' : ''}`}></BgDiv>
      </NavContainer>
      {isOpen && <ProfileDropdown onClick={singOut} rol={userSessionData.rol} />}
      {sessionOut &&
        <ModalContainer onClose={() => { onCloseSessionOutModal() }} className={'bg-transparent w-[220px] h-[150px] shadow-xl'} >
          <div className="w-full h-full p-4 flex items-center justify-center">
            <h1 className='font-semibold text-base text-center'>Has cerrado sesión.</h1>
          </div>
        </ModalContainer >}
    </>
  )
}

export default Navbar

const NavContainer = styled.nav`
  h2{
    color: white;
    font-weight: 400;
    span{
      font-weight: bold;
    }
  }
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: space-between;
  a{
    color: white;
    text-decoration: none;
    margin-right: 1rem;
  }
  .links{
    position: absolute;
    top: -700px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all .6s ease-in-out;
    a{
      color: white;
      font-size: 2rem;
      display: block;
    }
    @media(min-width: 768px){
      position: initial;
      margin: 0;
      a{
        font-size: 1rem;
        color: white;
        display: inline;
      }
      display: block;
    }
  }
  .links.active{
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 30%;
    left: 0;
    right: 0;
    text-align: center;
    a{
      font-size: 1.5rem;
      margin: 1rem;
      color: white;
      position: relative;
      z-index: 991;
    }
  }
  .burguer{
    @media(min-width: 768px){
      display: none;
    }
  }
`

const BgDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  position: absolute;
  top: -1200px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 990;
  transition: all .6s ease-in-out;
  
  &.active{
    border-radius: 0 0 10px 10px;
    top: 75px;
    left: 0;
    width: 100%;
    height: 500px;
  }
`