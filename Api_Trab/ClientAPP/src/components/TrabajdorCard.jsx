import { useContacts } from '../context/ContactProvider.tsx';
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap-icons/font/bootstrap-icons.css'
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'


function TrabajadorCard({ trabajador }) {
    const navigate = useNavigate();
    const handledone = async () => {
        await toggleTaskDone(trabajador.Personid);
    }
    return (
        <div key={trabajador.Personid}>
            <table>
                <tr>
                    <th>Nomnbre</th>
                    <th>telefono</th>
                    <th>Correo</th>
                    <th>direccion</th>
                    <th>acciones</th>
                    <th>direcciossssssssssssn</th>
                    <th>direccion</th>
                </tr>
                <tr>
                    <td>{trabajador.Nombres}</td>
                    <td>{trabajador.Apellidoas}s</td>
                    <td>{trabajador.Tipo_documento}</td>
                    <td>{trabajador.Numero_documento}</td>
                    <td>{trabajador.Sexo}</td>
                    <td>{trabajador.Fecha_nacimiento}</td>
                    <td>{trabajador.Direccion}</td>
                </tr>
                <tr>

                </tr>
            </table>
        </div>





    )
}

export default TrabajadorCard