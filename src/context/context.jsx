import { createContext, useState, useContext, useEffect } from "react";

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
    const [modalFormOpen, setModalFormOpen] = useState('');
    const [data, setData] = useState({});
    const [modalConfirmacionAbierto, setModalConfirmacionAbierto] = useState(false);
    const [modalEmpleado, setModalEmpleado] = useState(false);
    const [mensajeEnviado, setMensajeEnviado] = useState([])
    useEffect(() => {
    })

/* Devuelve componente de los hooks implementados en el context*/
    return (
        <Context.Provider value={{
            modalFormOpen, setModalFormOpen,
            data, setData,
            modalConfirmacionAbierto, setModalConfirmacionAbierto,
            modalEmpleado, setModalEmpleado,
            mensajeEnviado, setMensajeEnviado
        }}>
            {children}
        </Context.Provider>
    );
};