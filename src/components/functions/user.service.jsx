import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export class User {
    constructor() { }

    async saveUser(user) {
        try {
            const docRef = await addDoc(collection(db, "usuarios"), {
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
                rol: user.rol,
                createdAt: new Date()
            });
            return docRef.id;
        } catch (error) {
            console.error("Error ", error.message);
            throw new Error(error.message);
        }


    }

    isAuthenticated() {
        return this.isAuthenticated;
    }
}