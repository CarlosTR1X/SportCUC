import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Navbar from './layout/navbar/Navbar.component'
import { CtxProvider, useCtx } from './context/context'
import LoginCard from './components/LoginCard/LoginCard'
import SignUpCard from './components/signUpCard/SignUpCard'
import PopUp from './components/PopUps/PopUp'
import AuthModalIndex from './layout/AuthModal/AuthModal'
import ProfileDropdown from './components/Buttons/DropdownProfile'
import Sidebar from './layout/Sidebar/Sidebar'
import PanelAdmin from './layout/PanelAdmin/PanelAdmin'
import ButtonAgregar from './components/Buttons/ButtonAgregar'
import ModalEditCancha from './components/Modals/ModalEditCancha'
import AuthIndex from './layout/AuthIndex/AuthIndex'
import CardHorizontalForPlace from './components/Cards/CardHorizontalForPlace'
import ReservarIndex from './layout/Reservar/ReservarIndex'
import Home from './layout/home/Home'



function App() {
  const { authSession } = useCtx()

  const getUserDataFromLocalStorage = () => {
    const userDataString = localStorage.getItem("userData");
    return userDataString ? JSON.parse(userDataString) : null;
  };

  // Componente protegido que verifica el rol del usuario
  const AdminRoute = ({ element, ...rest }) => {
    const userData = getUserDataFromLocalStorage();
    return userData && userData.rol === "admin" ? element : <Navigate to="/login" />;
  };
  const UserRoute = ({ element, ...rest }) => {
    const userData = getUserDataFromLocalStorage();
    return userData && userData.rol === "user" ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <div className="bg-[url('/gifs/fondo.gif')] bg-no-repeat bg-cover bg-center min-h-screen">
        <CtxProvider>
          <Router>
            <Navbar />
            {/*  <CardHorizontalForPlace /> */}
            {/* <ProfileDropdown /> */}
            {/* <LoginCard />*/}
            {/*  <Signup /> */}
            {/* <AuthModalIndex /> */}
            {/* <PopUp status={true} message={'Usuario registrado con exito.'} />
          <PopUp status={false} message={'Error ha pasado algo'} /> */}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<AuthIndex />} />
              <Route path="/admin" element={<AdminRoute element={<PanelAdmin />} />} />
              <Route path="/reservar" element={<UserRoute element={<ReservarIndex />} />} />
            </Routes>
          </Router>
        </CtxProvider>
      </div>
    </>
  )
}

export default App
