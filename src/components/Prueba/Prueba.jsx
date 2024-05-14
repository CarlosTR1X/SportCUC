import { collection, doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { db } from '../../../fireBase'


const Prueba = () => {

    const handleTest = async () => {
        try {
            const userCollection = collection(db, "usuarios")
            const snapshot = await getDoc(userCollection)
            const userData = await snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()

            }))
            console.log(userData)
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <div><button onClick={handleTest}>Prueba</button></div>
    )
}

export default Prueba