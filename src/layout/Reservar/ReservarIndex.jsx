import React, { useEffect, useState } from 'react'
import ItemsCard from '../../components/Cards/ItemsCard';
import { Canchas } from '../../functions/canchas.service';
import CardHorizontalForPlace from '../../components/Cards/CardHorizontalForPlace';

const ReservarIndex = () => {
    const canchaServices = new Canchas();
    const [courts, setCourts] = useState([]);

    const fetchCourts = async () => {
        try {
            const courtData = await canchaServices.getCourts();
            setCourts(courtData);
        } catch (error) {
            console.error("Error al obtener las canchas:", error);
        }
    };

    useEffect(() => {
        fetchCourts();
    }, []);

    return (
        <>
            <div className="bg-[url('/images/fondo.png')] bg-no-repeat bg-cover bg-center min-h-screen pt-16">
                <h1 className="text-3xl font-bold text-white m-5">Reserva tu cancha favorita</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {courts.map((cancha, index) => (
                        <CardHorizontalForPlace
                            key={index}
                            item={cancha}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ReservarIndex
