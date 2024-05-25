import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import BurguerButton from './burguerButton/BurguerButton.component'
import Button from '../../components/Buttons/Button'
import { useCtx } from '../../context/context'
import AuthModalIndex from '../AuthModal/AuthModal'
import ProfileDropdown from '../../components/Buttons/DropdownProfile'
import ModalContainer from '../../components/Modals/ModalContainer'

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false)
  const { authSession, setModalData, modalData, cerrarSesion, userSessionData } = useCtx()
  const [isOpen, setIsOpen] = useState(false);
  const [sessionOut, setSessionOut] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  let navbarClasses = ['navbar'];
  if (scrolled) {
    navbarClasses.push('scrolled');
  }

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
      navigate('/')
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
      <div >
        <NavContainer className={`${navbarClasses.join(' ')} `}>
          <Link to="/"><h2>Sport</h2></Link>
          <div className={` links ${active ? 'active' : ''}`}>
            <Link to="/">Home</Link>
            {userSessionData.rol == 'user' && <Link to="/reservar">Reservar</Link>}
            {!authSession ? (<>
              <Link onClick={() => handleLoginButton()}>Log In</Link>
              <Link onClick={() => handleSignupButton()}>Sign Up</Link>
            </>) : (<>
              {userSessionData.rol == 'admin' && <Link to="/admin">Admin</Link>}
              <Link onClick={toggleDropdown}>
                <div className="mt-2 inline-flex w-8 h-8 relative justify-center rounded-full overflow-hidden">
                  <img className="object-fill object-center scale-110" src='images/user_default.jpg' alt='Woman looking front' />
                </div>
              </Link>

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
          <ModalContainer onClose={() => { onCloseSessionOutModal() }} className={'bg-baseBlack w-[220px] h-[150px] shadow-gray-600 shadow-sm'} >
            <div className="w-full h-full p-4 flex items-center justify-center">
              <h1 className='font-semibold text-base text-center text-white'>Has cerrado sesión.</h1>
            </div>
          </ModalContainer >}
      </div>

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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  padding: 1rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  transition: background-color 0.3s;
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
      align-items: center;
      a{
        font-size: 1rem;
        color: white;
        display: inline;
      }
      display: flex;
    }
  }
  .links.active{
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 100%;
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
  background-color: transparent;
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