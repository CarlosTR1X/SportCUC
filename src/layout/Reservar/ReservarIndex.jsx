import React, { useEffect, useState } from 'react';
import { Canchas } from '../../functions/canchas.service';
import { Reservas } from '../../functions/Reservar.service';
import CardHorizontalForPlace from '../../components/Cards/CardHorizontalForPlace';
import SearchBar from '../../components/Inputs/SearchBar';
import { useCtx } from '../../context/context';
import { set } from 'firebase/database';

const ReservarIndex = () => {
    const canchaServices = new Canchas();
    const bookingInstance = new Reservas();
    const [courts, setCourts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState(1);
    const [myBookings, setMyBookings] = useState([]);
    const { userSessionData } = useCtx();
    const fetchCourts = async () => {
        try {
            const courtData = await canchaServices.getCourtByStatus();
            setCourts(courtData);
        } catch (error) {
            console.error('Error al obtener las canchas:', error);
        }
    };

    const fetchMyBookings = async () => {
        try {
            const userDataString = localStorage.getItem('userData');
            if (!userDataString) {
                console.error("No se encontraron datos de usuario en el localStorage.");
                return;
            }
            const userData = JSON.parse(userDataString);
            // Obtener el id del usuario
            const userId = userData.id;
            const myBookingsFetch = await bookingInstance.getMyBookings(userId);
            if (myBookingsFetch) {
                const myBookingsData = await Promise.all(myBookingsFetch.map(async (booking) => {
                    const courtData = await canchaServices.getCourtById(booking.canchaId);
                    return {
                        ...courtData
                    }
                }));;
                setMyBookings(myBookingsData);
            } else {
                console.error("No se encontraron reservas para el usuario.");
            }
        } catch (error) {
            console.error('Error al obtener las reservas:', error);
        }
    }


    useEffect(() => {
        fetchCourts();
        fetchMyBookings();
    }, []);

    const handleSaveBooking = async (item) => {
        const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null;
        const bookingSaveData = {
            nombre: item.nombre,
            customerId: userData.id,
            canchaId: item.id,
        };
        const booking = await bookingInstance.saveBooking(bookingSaveData);
        if (booking) {
            fetchCourts();
            console.log('Reserva guardada correctamente');
        }
    };

    const filteredCourts = courts.filter((court) =>
        court.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    return (
        <>
            <div className="bg-[url('/images/fondo.png')] bg-no-repeat bg-cover bg-center min-h-screen pt-16">
                <div className="flex">
                    <button
                        className={`w-1/2 py-2 border-b-2 rounded-sm text-white ${activeTab === 1 ? 'border-blue-500' : 'border-gray-300'
                            }`}
                        onClick={() => handleTabClick(1)}
                    >
                        Reservar
                    </button>
                    <button
                        className={`w-1/2 py-2 border-b-2 rounded-sm text-white ${activeTab === 2 ? 'border-blue-500' : 'border-gray-300'
                            }`}
                        onClick={() => {
                            fetchMyBookings();
                            handleTabClick(2)
                        }}
                    >
                        Mis Reservas
                    </button>
                </div>
                <div className="mt-4">
                    {activeTab === 1 &&
                        /* Pagina 1 */
                        <div>
                            <h1 className="text-lg md:text-3xl font-bold text-center text-white m-5">Reserva tu cancha favorita</h1>
                            <SearchBar onSearch={setSearchTerm} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {filteredCourts.map((cancha, index) => (
                                    <CardHorizontalForPlace
                                        key={index}
                                        item={cancha}
                                        onClick={() => handleSaveBooking(cancha)}
                                    />
                                ))}
                            </div>
                        </div>}
                    {activeTab === 2 &&
                        /* Pagina 2 */
                        <>
                            <div>
                                <h1 className="text-lg md:text-3xl font-bold text-center text-white m-5">Reserva tu cancha favorita</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {myBookings.map((cancha, index) => (
                                        <CardHorizontalForPlace
                                            key={index}
                                            item={cancha}
                                            onClick={() => console.log(cancha)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    );
};

export default ReservarIndex;
