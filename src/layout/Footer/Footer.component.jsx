import React, { useState } from 'react'
import InputWithLabel from '../../components/Inputs/InputWithLabel';



const Footer = () => {

    const [formData, setFormData] = useState({
        email: ''
    });


    const handleChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleReservar = () => {
        console.log('Reservar')
    }

    return (
        <footer className="bg-black text-white pt-4 pb-1">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo and Social Media */}
                    <div>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
                            alt="Nike Logo"
                            className="w-24 mb-4"
                        />
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/nike" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook fa-2x hover:text-blue-500 hover:scale-105 transitio duration-300"></i>
                            </a>
                            <a href="https://www.twitter.com/nike" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter fa-2x hover:text-blue-200 hover:scale-105 transitio duration-300"></i>
                            </a>
                            <a href="https://www.instagram.com/nike" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram fa-2x  rounded-xl hover:bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-50 hover:scale-105 transitio duration-100"></i>
                            </a>
                        </div>
                    </div>
                    {/* Navigation Links */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">Enlaces Rápidos</h2>
                        <ul className="space-y-2">
                            <li onClick={(handleReservar)}><a className="hover:text-gray-400">Reservar</a></li>
                        </ul>
                    </div>
                    {/* Newsletter Subscription */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">Suscríbete al boletín</h2>
                        <form>
                            <InputWithLabel onChange={handleChange} type={"email"} name="email" placeholder={"Introduce tu correo"} label="E-mail" value={formData.email} className="w-full p-2 mb-4 text-white" />
                            <button
                                type="submit"
                                className="w-full bg-transparent text-white border border-white py-2 hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-white hover:text-black"
                            >
                                Suscribirse
                            </button>
                        </form>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <p className='text-xs'>&copy; 2024 Sport, Inc. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
