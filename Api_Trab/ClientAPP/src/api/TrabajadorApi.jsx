import axios from 'axios';


export const getTrabajadorRequest = async () =>
    await axios.get('https://localhost:7007/api/Trabajador/Listar');

export const createTrabajadorRequest = async (trabajadore) => {
    return await axios.post('https://localhost:7007/api/Trabajador/Agregar', trabajadore, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};
export const deleteTrabajadorRequest = async (id) =>
    await axios.delete(`https://localhost:7007/api/Trabajador/Eliminar?id=${id}`);

export const getTrabajadorRequestById = async (id) =>
    await axios.get(`https://localhost:7007/api/Trabajador/${id}`);

export const updateTrabajadorRequest = async (id, trabajador) =>
    await axios.put(`https://localhost:7007/api/Trabajador/${id}`, trabajador);

