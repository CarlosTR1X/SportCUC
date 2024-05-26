import React, { useEffect, useState } from 'react'
import { Canchas } from '../../functions/canchas.service';
import { Reservas } from '../../functions/Reservar.service';
import CardHorizontalForPlace from '../../components/Cards/CardHorizontalForPlace';

const ReservarIndex = () => {
    const canchaServices = new Canchas();
    const bookingInstance = new Reservas();
    const [courts, setCourts] = useState([]);

    const fetchCourts = async () => {
        try {
            const courtData = await canchaServices.getCourtByStatus();
            setCourts(courtData);
        } catch (error) {
            console.error("Error al obtener las canchas:", error);
        }
    };


    useEffect(() => {
        fetchCourts();
    }, []);

    const handleSaveBooking = async (item) => {
        const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null;
        const bookingSaveData = {
            nombre: item.nombre,
            customerId: userData.id,
            canchaId: item.id
        }
        const booking = await bookingInstance.saveBooking(bookingSaveData)
        if (booking) {
            fetchCourts();
            console.log("Reserva guardada correctamente");
        }
    }

    return (
        <>
            <div className="bg-[url('/images/fondo.png')] bg-no-repeat bg-cover bg-center min-h-screen pt-16">
                <h1 className="text-3xl font-bold text-white m-5">Reserva tu cancha favorita</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {courts.map((cancha, index) => (
                        <CardHorizontalForPlace
                            key={index}
                            item={cancha}
                            onClick={() => handleSaveBooking(cancha)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ReservarIndex
