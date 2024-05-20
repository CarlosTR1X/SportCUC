import React, { useState } from 'react'
import Image from '../Image/Image'
import InputWithLabel from '../Inputs/InputWithLabel'
import Button from '../Buttons/Button';
import { useCtx } from '../../context/context';

const LoginCard = () => {
    const { login } = useCtx();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const verify = await login(formData.email, formData.password);
        if (verify) setFormData({ email: '', password: '' });
    }

    return (
        <div className='w-[90%] m-auto py-14'>
            <form className='p-5  rounded-lg' onSubmit={onSubmit}>
                <p className='font-medium text-baseBlack mb-6'>Bienvenido de nuevo! 👋🏻</p>
                {error && <p className="m-1 mx-1 text-red-500 text-sm">🚨 Error de testeo</p>}

                <InputWithLabel onChange={handleChange} value={formData.email} type='text' name='email' label="Email" className='mb-3' />
                <InputWithLabel onChange={handleChange} value={formData.password} type='password' name='password' label="Password" className='mb-3' />
                <Button className='bg-green-500 text-white w-full mt-2'>Login</Button>
                <p className='text-gray-600 mt-6 text-sm font-small'>
                    Si no cuentas con un numero telefónico, <span className='text-gray-600 font-semibold'>Ve otras opciones de ingreso abajo</span>
                </p>

            </form>
        </div>
    )
}

export default LoginCard
