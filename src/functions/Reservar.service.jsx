import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where
} from "firebase/firestore";
import { db } from "../firebase";
import { Canchas } from "./canchas.service";

const canchaServices = new Canchas();

export class Reservas {

    constructor() {

    }

    async saveBooking(booking) {
        try {
            const reservasRef = collection(db, "reservas");

            // Realizamos una consulta para verificar si ya existe una reserva con el mismo canchaId
            const querySnapshot = await getDocs(query(reservasRef, where('canchaId', '==', booking.canchaId)));

            if (!querySnapshot.empty) {
                throw new Error("Ya existe una reserva para esta cancha.");
            }

            const docRef = await addDoc(reservasRef, {
                "nombre": booking.nombre,
                "customerId": booking.customerId,
                "canchaId": booking.canchaId,
                "status": true,
                "createdAt": new Date()
            });
            if (docRef) {
                const cancha = await canchaServices.updateCourtAvailability(booking.canchaId, false);
                if (cancha.success) {
                    return docRef.id;
                }
            }
        } catch (error) {
            console.error("Error ", error.message);
            throw new Error(error.message);
        }
    }

    async getBookings() {
        try {
            const courtRef = collection(db, "canchas");
            const querySnapshot = await getDocs(query(courtRef, where('status', '==', true)));
            const courtDocs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return courtDocs;
        } catch (error) {
            console.error("Error al obtener las canchas:", error);
        }
    }

    async getMyBookings(userId) {
        try {
            const bookingsRef = collection(db, "reservas");
            const querySnapshot = await getDocs(query(bookingsRef, where('customerId', '==', userId)));
            const bookingDocs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
           return bookingDocs;
        } catch (error) {
            console.error("Error al obtener las canchas:", error.message);
        }
    }
    
    async updateBooking(id, newData) {
        try {
            const courtRef = doc(db, "canchas", id);
            await updateDoc(courtRef, newData);
            return { success: true, message: "Documento actualizado correctamente" };
        } catch (error) {
            console.error("Error al actualizar el documento:", error.message);
            return { success: false, message: "Error al actualizar el documento: " + error.message };
        }
    }

}