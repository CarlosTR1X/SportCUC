import React, { useState } from 'react'
import ModalContainer from './ModalContainer';
import InputWithLabel from '../Inputs/InputWithLabel';
import Button from '../Buttons/Button';
import PopUp from '../PopUps/PopUp';
import InputWhithToggleSwitch from '../Inputs/InputWhithToggleSwitch';

const ModalNuevaCancha = ({ onClose }) => {
    const [error, setError] = useState(null);
    const [PopUpStatus, setPopUpStatus] = useState()
    const [canchaForm, setCanchaForm] = useState({
        nombre: '',
        descripcion: '',
        capacidad: '',
        direccion: '',
        imagen_URL: '',
        disponibilidad: '',
        /*  createdAt: new Date() */
    })
    console.log(canchaForm)
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let canchaData = {
                nombre: canchaForm.nombre,

            }

        } catch (e) {
            setError({ message: e.message })
        }
    }


    const handleChange = ({ target: { name, value } }) => {
        setCanchaForm({ ...canchaForm, [name]: value })
    }

    return (
        <>
            <ModalContainer className={`w-[420px]`} onClose={onClose}>
                <div className='w-full h-full m-auto mt-2 rounded-lg mb-2'>
                    <form className='p-5 rounded-lg overflow-y-auto' onSubmit={handleSubmit}>
                        <p className='font-medium text-baseBlack m-2'>Nueva cancha</p>
                        <InputWithLabel onChange={handleChange} value={canchaForm.nombre} type='text' name='nombre' label="Nombre" className='mb-3 ' />
                        <InputWithLabel onChange={handleChange} value={canchaForm.descripcion} type='text' name='descripcion' label="Descripcion" className='mb-3' />
                        <InputWithLabel onChange={handleChange} value={canchaForm.capacidad} type='number' name='capacidad' label="Capacidad Max." className='mb-3' />
                        <InputWithLabel onChange={handleChange} value={canchaForm.direccion} type='text' name='direccion' label="Direccion" className='mb-3' />
                        <InputWithLabel onChange={handleChange} value={canchaForm.imagen_URL} type='text' name='imagen_URL' label="Imagen URL" className='mb-3' />
                        <div>
                            <InputWhithToggleSwitch value={canchaForm.disponibilidad} className='w-full' label='Disponibilidad' name='disponibilidad' onChange={handleChange} />
                        </div>
                        {error?.message && <p className=" m-1 mx-1 text-red-500 text-sm">🚨 {error.message}</p>}

                        <Button className='bg-green-500 text-white w-full mt-5'>
                            Save
                        </Button>
                    </form>
                    {PopUpStatus && (
                        <PopUp status={propsPopUp.status} message={`${propsPopUp.message}`} onClose={handleCloseModal} />
                    )}
                </div >
            </ModalContainer>
        </>
    )
}

export default ModalNuevaCancha
