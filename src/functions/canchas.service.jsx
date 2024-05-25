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

export class Canchas {
    constructor() { }

    async saveCourt(cancha) {
        try {
            const docRef = await addDoc(collection(db, "canchas"), {
                "nombre": cancha.nombre,
                "tipo": cancha.tipo,
                "descripcion": cancha.descripcion,
                "disponibilidad": cancha.disponibilidad,
                "capacidad": cancha.capacidad,
                "direccion": cancha.direccion,
                "imagen_URL": cancha.imagen_URL,
                "createdAt": new Date()
            });
            return docRef.id;
        } catch (error) {
            console.error("Error ", error.message);
            throw new Error(error.message);
        }
    }

    async getCourts() {
        try {
            const courtRef = collection(db, "canchas");
            const querySnapshot = await getDocs(courtRef);
            const courtDocs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return courtDocs;
        } catch (error) {
            console.error("Error al obtener las canchas:", error);
        }
    }

    async updateCourt(id, newData) {
        try {
            const courtRef = doc(db, "canchas", id);
            await updateDoc(courtRef, newData);
            return { success: true, message: "Documento actualizado correctamente" };
        } catch (error) {
            console.error("Error al actualizar el documento:", error.message);
            return { success: false, message: "Error al actualizar el documento: " + error.message };
        }
    }

    async deleteCourt(id) {
        try {
            const courtRef = doc(db, "canchas", id);
            await deleteDoc(courtRef);
            return { success: true, message: "Documento eliminado correctamente" };
        } catch (error) {
            console.error("Error al eliminar el documento:", error.message);
            return { success: false, message: "Error al eliminar el documento: " + error.message };
        }
    }

    async getCourtByStatus() {
        try {
            const courtRef = doc(db, "canchas", id);
            const querySnapshot = await getDocs(query(courtRef, where('email', '==', email)));
            const courtDocs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return courtDocs;

        } catch (error) {
            console.error("Error al obtener el usuario:", error);
        }
    }

    isAuthenticated() {
        return this.isAuthenticated;
    }
}