
import { useContext, useState } from 'react'
import {
    getTrabajadorRequest,
    createTrabajadorRequest,
    getTrabajadorRequestById,
    deleteTrabajadorRequest,
    updateTrabajadorRequest

} from '../api/TrabajadorApi.jsx';

import { TrabajadorContext } from '../context/TrabajadorContext.jsx';

export const useTrabajador = () => {
    const context = useContext(TrabajadorContext)
    if (!context) {
        throw new Error('use contacts must be used within a TrabajadorContext')
    }
    return context

}
export const TrabajadorContextProvider = ({ children }) => {
    const [trabajadores, setTrabajador] = useState([]);

    async function loadTrabajador() {
        try {
            const response = await getTrabajadorRequest();
            setTrabajador(response.data);
        } catch (error) {
            console.log(error)
        }

    }
    const createTrabajador = async (trabajador) => {
        try {
            await createTrabajadorRequest(trabajador);
        } catch (error) {
            console.log(error);
        }
    }
    const getTrabajadorId = async (id) => {
        try {
            const response = await getTrabajadorRequestById(id);
            return response.data;
        } catch (error) {
            console.error("Error fetching task by ID:", error);
        }
    }

    const updateTrabajador = async (id, trabajador) => {
        try {
            const response = await updateTrabajadorRequest(id, trabajador);
            console.log("Trabajador actualizado:", response);
            return response.data;
        } catch (error) {
            console.error("Error updating trabajador:", error);
        }
    };
    const DeletTrabajador = async (id) => {
        try {
            console.log('🗑️ Eliminando trabajador ID:', id);

            const response = await deleteTrabajadorRequest(id);
            console.log('✅ Respuesta de eliminación:', response.data);
            setTrabajador(trabajadores.filter(trabajador => trabajador.personid !== id));
            return response.data;

        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }
    return (
        <TrabajadorContext.Provider
            value={{ trabajadores, DeletTrabajador ,loadTrabajador, createTrabajador, getTrabajadorId, updateTrabajador }}>
            {children}
        </TrabajadorContext.Provider>
    )
}
