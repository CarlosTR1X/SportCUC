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

  return (
    <>
      <CtxProvider>
        <Router>
          <Navbar />
          {/* <ProfileDropdown /> */}
          {/* <LoginCard />*/}
          {/*  <Signup /> */}
          {/* <AuthModalIndex /> */}
          {/* <PopUp status={true} message={'Usuario registrado con exito.'} />
          <PopUp status={false} message={'Error ha pasado algo'} /> */}

          <Routes>
            <Route path="/admin" element={<AdminRoute element={<PanelAdmin />} />} />
          </Routes>
        </Router>
      </CtxProvider>
    </>
  )
}

export default App
