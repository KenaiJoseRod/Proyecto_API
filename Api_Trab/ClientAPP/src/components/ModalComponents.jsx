import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

function ModalTrabajador({ show, handleClose, onSubmit }) {
    const API_BASE_URL = process.env.REACT_APP_API_URL;

    const [form, setForm] = useState({
        Nombres: "",
        Apellidos: "",
        Tipo_documento: "",
        Numero_documento: "",
        Sexo: "",
        Direccion: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const enviar = () => {
        onSubmit(form);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Crear Trabajador</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control name="Nombres" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control name="Apellidos" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tipo Documento</Form.Label>
                        <Form.Control name="Tipo_documento" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Número Documento</Form.Label>
                        <Form.Control name="Numero_documento" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Sexo</Form.Label>
                        <Form.Control name="Sexo" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group m>
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control name="Direccion" onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={enviar}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalTrabajador;