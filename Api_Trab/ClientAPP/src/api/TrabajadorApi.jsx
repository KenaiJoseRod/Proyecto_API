import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getTrabajadorRequest = async () =>
    await axios.get(`${API_BASE_URL}/api/Trabajador/Listar`);

export const createTrabajadorRequest = async (trabajador) => {
    await axios.post(`${API_BASE_URL}/api/Trabajador/Agregar`, trabajador, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};
export const deleteTrabajadorRequest = async (id) =>
    await axios.delete(`${API_BASE_URL}/api/Trabajador/Eliminar?id=${id}`);

export const getTrabajadorRequestById = async (id) =>
    await axios.get(`${API_BASE_URL}/api/Trabajador/${id}`);

export const updateTrabajadorRequest = async (trabajador) =>
    await axios.put(`${API_BASE_URL}/api/Trabajador/Modificar`, trabajador, {
        headers: { 'Content-Type': 'multipart/form-data' }
   
    });
