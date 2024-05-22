import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export class Canchas {
    constructor() { }

    async saveCourt(cancha) {
        try {
            const docRef = await addDoc(collection(db, "canchas"), {
                "nombre": cancha.nombre,
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

    async getCourt(email) {
        try {


        } catch (error) {
            console.error("Error al obtener el usuario:", error);
        }
    }


    isAuthenticated() {
        return this.isAuthenticated;
    }
}