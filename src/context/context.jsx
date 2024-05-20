import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../firebase";

const Context = createContext("");
export const useCtx = () => useContext(Context);

/* 
Context es una hook propio de react para manejar el comportamiento de variales y componentes
en un entorno local.
*/
export function CtxProvider({ children }) {

    /*
    Instnaciamos los useStates de todos nuestros componentes que usaremos en el proyecto
    */
    const [authSession, setAuthSession] = useState(null);
    const [modalFormOpen, setModalFormOpen] = useState('');
    const [data, setData] = useState({});
    const [modalConfirmacionAbierto, setModalConfirmacionAbierto] = useState(false);
    const [modalEmpleado, setModalEmpleado] = useState(false);
    const [mensajeEnviado, setMensajeEnviado] = useState([])
    const [modalData, setModalData] = useState({ open: false, modalId: "" })

    useEffect(() => {
        // Verificar si el usuario ya está autenticado al cargar la página
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("verificando estado del usuario con firebase");
            setAuthSession(user);
        });

        // Limpia el suscriptor al desmontar el componente
        return () => unsubscribe();
    }, [])


    const login = async (email, password) => {
        try {
            const session = await signInWithEmailAndPassword(auth, email, password);
            return session
        } catch (e) {
            console.log(e.message)
            throw e;
        }
    }

    const signUp = async (email, password) => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            return user
        } catch (e) {
            console.log(e)
            throw e;
        }
    }

    /* Devuelve componente de los hooks implementados en el context*/
    return (
        <Context.Provider value={{
            authSession, setAuthSession,
            login, signUp,
            modalFormOpen, setModalFormOpen,
            data, setData,
            modalConfirmacionAbierto, setModalConfirmacionAbierto,
            modalEmpleado, setModalEmpleado,
            mensajeEnviado, setMensajeEnviado,
            modalData, setModalData
        }}>
            {children}
        </Context.Provider>
    );
};