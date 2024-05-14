import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import BurguerButton from './burguerButton/BurguerButton.component'

const Navbar = () => {
  const [active, setActive] = useState(false)
  const handleClick = () => {
    setActive(!active)
  }


  return (
    <>
      <NavContainer>
        <Link to="/"><h2>Sport</h2></Link>
        <div className={`links ${active ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/about">Sobre Nosotros</Link>
          <Link to="/msg">Register</Link>
          <Link to="/prestamo">LogIn</Link>
        </div>
        <div className='burguer'>
          <BurguerButton active={active} handleClick={handleClick} />
        </div>
        <BgDiv className={`initial ${active ? ' active' : ''}`}></BgDiv>
      </NavContainer>

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
    left: -2000px;
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
      z-index: 999;
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
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: 990;
  transition: all .6s ease-in-out;
  
  &.active{
    border-radius: 0 0 40% 0;
    top: 75px;
    left: 0;
    width: 100%;
    height: 100%;
  }
`