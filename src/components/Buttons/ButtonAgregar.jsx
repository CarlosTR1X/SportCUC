import React from 'react'
import Imagen from '../Image/Image'

const ButtonAgregar = ({ text, onClick }) => {
    return (
        <div className="relative h-20">
            <button onClick={onClick}
                className="absolute top-0 right-0 m-4 p-2 rounded-full bg-transparent cursor-pointer
             focus:outline-none hover:bg-green-200 hover:border-green-200 flex items-center
             space-x-2 shadow-2xl border border-gray-150 hover:scale-105 transform transition-transform duration-300 ease-in-out">
                <span className="text-baseGray text-sm">{text}</span>
                <Imagen className="rounded-full object-cover" width={20} height={40} path="./images/add-button.png" alt="Agregar" />
            </button>
        </div>
    )
}

export default ButtonAgregar
