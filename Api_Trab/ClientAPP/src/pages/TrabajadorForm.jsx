import { Form, Formik } from 'formik'
import { useTrabajador } from '../context/TrabajadorProvider.jsx';
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Form as BootstrapForm, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2'

function TrabajadorForm() {
    const { createTrabajador, getTrabajadorId, updateTrabajador } = useTrabajador();
    const [fotoArchivo, setFotoArchivo] = useState(null);

    const [trabajador, setTrabajador] = useState({
        nombres: "",
        apellidos: "",
        tipoDocumento: "",
        numeroDocumento: "",
        sexo: "",
        fechaNacimiento: "",
        foto: "",
        direccion: ""
    })
    const params = useParams();
   
    const navigate = useNavigate();

    useEffect(() => {
        const loadTrabajador = async () => {
            try {
                if (params.id) {
                    console.log('Cargando trabajador ID:', params.id);

                    const trabajador = await getTrabajadorId(params.id);

                    setTrabajador({
                        nombres: trabajador.nombres,
                        apellidos: trabajador.apellidos,
                        tipoDocumento: trabajador.tipoDocumento,
                        numeroDocumento: trabajador.numeroDocumento,
                        sexo: trabajador.sexo,
                        fechaNacimiento: trabajador.fechaNacimiento,
                        foto: trabajador.foto,
                        direccion: trabajador.direccion
                    }); 
                }
               
            } catch (error) {
                console.error("Error loading task:", error);
            }
        };
        loadTrabajador();
    }, []);
  
    return (
        <div className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '50px' }} >


            <Formik
                enableReinitialize
                initialValues={trabajador}
                onSubmit={async (values, actions) => {
                    try {
                        const formData = new FormData();

                        // Agregamos todos los campos
                        formData.append("nombres", values.nombres);
                        formData.append("apellidos", values.apellidos);
                        formData.append("tipoDocumento", values.tipoDocumento);
                        formData.append("numeroDocumento", values.numeroDocumento);
                        formData.append("sexo", values.sexo);
                        formData.append("fechaNacimiento", values.fechaNacimiento);
                        formData.append("direccion", values.direccion);

                        // Agregar foto si existe
                        if (fotoArchivo) {
                            formData.append("foto", fotoArchivo);
                        }

                        if (params.id) {
                            formData.append("Personid", params.id); // importante para PUT
                            await updateTrabajador(params.id, formData);
                            Swal.fire('Actualizado', 'El trabajador ha sido editado con éxito', 'success');
                            navigate('/');
                        } else {
                            await createTrabajador(formData);
                            Swal.fire('Creado', 'El trabajador se ha creado con éxito', 'success');
                        }

                        // Limpiar formulario
                        setTrabajador({
                            nombres: "",
                            apellidos: "",
                            tipoDocumento: "",
                            numeroDocumento: "",
                            sexo: "",
                            fechaNacimiento: "",
                            direccion: ""
                        });
                        setFotoArchivo(null);

                    } catch (error) {
                        console.error("Error al guardar trabajador:", error);
                        Swal.fire('Error', 'No se pudo guardar el trabajador', 'error');
                    }
                }}
            >
                {({ handleChange, handleSubmit, values, isSubmitting }) => (

                    <BootstrapForm onSubmit={handleSubmit} className="w-75">
                        <h1 className="text-center mb-4">
                            {params.id ? 'Editar Trabajador' : 'Crear Trabajador'}
                        </h1>

                        <Row>
                            <Col md={6}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>Nombres *</BootstrapForm.Label>
                                    <BootstrapForm.Control
                                        required
                                        type="text"
                                        name="nombres"
                                        value={values.nombres}
                                        onChange={handleChange}
                                        placeholder="Ingrese los nombres"
                                    />
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>Apellidos *</BootstrapForm.Label>
                                    <BootstrapForm.Control
                                        required
                                        type="text"
                                        name="apellidos"
                                        value={values.apellidos}
                                        onChange={handleChange}
                                        placeholder="Ingrese los apellidos"
                                    />
                                </BootstrapForm.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>Tipo Documento *</BootstrapForm.Label>
                                    <BootstrapForm.Select
                                        name="tipoDocumento"
                                        value={values.tipoDocumento}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Seleccione tipo</option>
                                        <option value="DNI">DNI</option>
                                        <option value="RUC">RUC</option>
                                        <option value="CE">Carnet Extranjería</option>
                                    </BootstrapForm.Select>
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>Número Documento *</BootstrapForm.Label>
                                    <BootstrapForm.Control
                                        required
                                        type="text"
                                        name="numeroDocumento"
                                        value={values.numeroDocumento}
                                        onChange={handleChange}
                                        placeholder="Ingrese el número de documento"
                                    />
                                </BootstrapForm.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>Sexo *</BootstrapForm.Label>
                                    <BootstrapForm.Select
                                        name="sexo"
                                        value={values.sexo}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Seleccione sexo</option>
                                        <option value="M">Masculino</option>
                                        <option value="F">Femenino</option>
                                        <option value="O">Otro</option>
                                    </BootstrapForm.Select>
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>Fecha Nacimiento *</BootstrapForm.Label>
                                    <BootstrapForm.Control
                                        required
                                        type="date"
                                        name="fechaNacimiento"
                                        value={values.fechaNacimiento}
                                        onChange={handleChange}
                                    />
                                </BootstrapForm.Group>
                            </Col>
                        </Row>

                        <BootstrapForm.Group className="mb-3">
                            <BootstrapForm.Label>Dirección</BootstrapForm.Label>
                            <BootstrapForm.Control
                                type="text"
                                name="direccion"
                                value={values.direccion}
                                onChange={handleChange}
                                placeholder="Ingrese la dirección"
                            />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group className="mb-3">
                            <BootstrapForm.Label>Foto</BootstrapForm.Label>
                            <BootstrapForm.Control
                                type="file"
                                name="foto"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) setFotoArchivo(file);
                                }}
                            />
                        </BootstrapForm.Group>


                        <div className="d-flex gap-2 justify-content-center">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Guardando...' : (params.id ? 'Actualizar Trabajador' : 'Crear Trabajador')}
                            </Button>

                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => navigate('/')}
                            >
                                Volver
                            </Button>
                        </div>
                    </BootstrapForm>
                )}
            </Formik>
        </div>
    );
}

export default TrabajadorForm;