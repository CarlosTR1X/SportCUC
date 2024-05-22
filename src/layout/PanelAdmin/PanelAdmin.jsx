import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import ItemsCard from '../../components/Cards/ItemsCard';
import ModalVerCancha from '../../components/Modals/ModalVerCancha';
import ButtonAgregar from '../../components/Buttons/ButtonAgregar';
import ModalEditCancha from '../../components/Modals/ModalEditCancha';
import ModalNuevaCancha from '../../components/Modals/ModalNuevaCancha';

const PanelAdmin = () => {
    const [editData, setEditData] = useState(false);
    const [modalStatus, setModalStatus] = useState({
        add: false,
        show: false,
        edit: false,
        delete: false
    });

    const canchas = [
        {
            nombre: "Cancha Central",
            descripcion: "Una cancha excelente para partidos profesionales.",
            disponibilidad: true,
            capacidad: 5000,
            direccion: "123 Calle Falsa, Ciudad, País",
            imagen_URL: "https://via.placeholder.com/400x300",
            createdAt: new Date()
        },
        {
            nombre: "Cancha Norte",
            descripcion: "Ideal para entrenamientos y partidos locales.",
            disponibilidad: false,
            capacidad: 3000,
            direccion: "456 Calle Verdadera, Ciudad, País",
            imagen_URL: "https://via.placeholder.com/400x300",
            createdAt: new Date()
        },
        {
            nombre: "Cancha Sur",
            descripcion: "Perfecta para torneos y eventos especiales.",
            disponibilidad: true,
            capacidad: 4500,
            direccion: "789 Calle Ejemplo, Ciudad, País",
            imagen_URL: "https://via.placeholder.com/400x300",
            createdAt: new Date()
        }
        // Puedes agregar más canchas aquí
    ];
    const handleEdit = (data) => {
        setModalStatus({ edit: true })
        setEditData(data)
    }

    const handleShow = (data) => {
        setModalStatus({ show: true })
        setEditData(data)
    }

    const handleNuevaCancha = () => {
        setModalStatus({ add: true })
    }
    return (
        <>
            <div>
                <ButtonAgregar text={`Agregar Cancha`} onClick={handleNuevaCancha} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {canchas.map((cancha, index) => (
                        <ItemsCard key={index} item={cancha} onShow={() => { handleShow(cancha) }} onEdit={() => { handleEdit(cancha) }} />
                    ))}
                    {modalStatus.show && <ModalVerCancha data={editData} onClose={() => { setModalStatus(false) }} />}
                    {modalStatus.edit && <ModalEditCancha data={editData} onClose={() => { setModalStatus(false) }} />}
                    {modalStatus.add && <ModalNuevaCancha onClose={() => { setModalStatus(false) }} />}
                </div>
            </div>

        </>
    )
}

export default PanelAdmin
