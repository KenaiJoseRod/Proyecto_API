import { cache, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Button from "react-bootstrap/Button";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap-icons/font/bootstrap-icons.css'
import ModalTrabajador from "../components/ModalComponents";
import Swal from 'sweetalert2'


import 'datatables.net-dt/css/dataTables.dataTables.css';
import { useTrabajador } from '../context/TrabajadorProvider';


function TrabajadorPage() {
    const { trabajadores, loadTrabajador, DeletTrabajador } = useTrabajador();
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        console.log("Cargando trabajadores...");
        loadTrabajador();
    }, []);

    const agregar = async () => {
        navigate('/new');
    }
    function handleClick(id) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esta acción.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                DeletTrabajador(id)

                Swal.fire('¡Eliminado!', 'El contacto fue eliminada.', 'success');
            }
        });
    }
    function renderMain() {
        if (trabajadores.length === 0) {
            return (
                <h1 className="text-muted text-center">No tasks found</h1>
            );
        }
        const searcher = (e) => {
            setSearch(e.target.value)

        }

        let resu = []
        if (!search) {
            resu = trabajadores
        } else {
            resu = trabajadores.filter((dato) =>
                dato.nombres.toLowerCase().includes(search.toLowerCase()) ||
                dato.apellidos?.toLowerCase().includes(search.toLowerCase())
            )
        }

        const columns = [
            {
                name: 'Foto',
                cell: row => row.foto
                    ? <img
                        src={`${API_BASE_URL}${row.foto}`}
                        alt="Foto"
                        width={80}
                        height={80}
                        style={{ objectFit: 'cover', borderRadius: '0%' }}
                    />
                    : <span>No tiene</span>
            },  
            { name: 'Nombres', selector: row => row.nombres, sortable: true },
            { name: 'Apellidos', selector: row => row.apellidos },
            { name: 'Tipo de Documento', selector: row => row.tipoDocumento },
            { name: 'Numero de documento', selector: row => row.numeroDocumento },
            { name: 'Sexo', selector: row => row.sexo },
            { name: 'Fecha de nacimento', selector: row => row.fechaNacimiento },      
            { name: 'Direccion', selector: row => row.direccion },
            {
               name: 'Acciones',
               cell: row => (
                    <>
                        <Button variant="outline-secondary" title='Elimiar' onClick={() => handleClick(row.personid)}><i className="bi bi-trash"></i></Button>
                       <Button variant="outline-secondary" title='Editar' onClick={() => navigate(`/EditTrabajador/${row.personid}`)}><i className="bi bi-pencil"></i></Button>

                    </>
                )
            }
            
                   
        ];
        return (
            <div className="mb-3 justify-content-center align-items-center" style={{ margin: '5rem' }} >

                <Button variant="primary"  onClick={agregar} >
                    volver
                </Button>
                <InputGroup className="mb-3" >
                    <InputGroup.Text>Buscador</InputGroup.Text>
                    <Form.Control value={search} onChange={searcher} type='text' />
                </InputGroup>

                <DataTable
                    columns={columns}
                    data={resu}
                    pagination
                    highlightOnHover

                />
            </div>
        );
    }


    return (
        <div >
            <div>
                <h1 className="text-center mb-4 ">Listado de Trabajadores</h1>
            </div>
            {
                renderMain()
            }
        </div>
    );
}

export default TrabajadorPage;
