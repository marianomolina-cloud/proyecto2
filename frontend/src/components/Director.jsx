import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Table, Form, Button, Row, Col, Card, Alert, Badge } from 'react-bootstrap';

const Director = () => {
    const [directores, setDirectores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        nombres: '',
        estado: 'Activo'
    });

    useEffect(() => {
        fetchDirectores();
    }, []);

    const fetchDirectores = async () => {
        try {
            setLoading(true);
            const response = await api.get('/directores');
            setDirectores(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar directores');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (director) => {
        setEditingId(director._id);
        setFormData({
            nombres: director.nombres,
            estado: director.estado
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este director?')) {
            try {
                await api.delete(`/directores/${id}`);
                setSuccess('Director eliminado correctamente');
                fetchDirectores();
            } catch (err) {
                setError('No se pudo eliminar el director');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            if (editingId) {
                await api.put(`/directores/${editingId}`, formData);
                setSuccess('Director actualizado correctamente');
            } else {
                await api.post('/directores', formData);
                setSuccess('Director registrado correctamente');
            }
            setFormData({ nombres: '', estado: 'Activo' });
            setEditingId(null);
            fetchDirectores();
        } catch (err) {
            setError(err.response?.data?.msj || 'Error al procesar la solicitud');
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({ nombres: '', estado: 'Activo' });
    };

    return (
        <div className="mt-4 animate__animated animate__fadeIn">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                <h2 className="fw-bold text-dark">Maestros: Gestión de Directores</h2>
                <Badge bg="primary" className="p-2">Configuración</Badge>
            </div>

            <Card className="mb-5 shadow border-0 overflow-hidden">
                <Row className="g-0">
                    <Col md={4} className="bg-primary d-flex align-items-center justify-content-center text-white p-4">
                        <div className="text-center">
                            <i className={`bi ${editingId ? 'bi-person-gear' : 'bi-person-plus'} display-1 mb-3`}></i>
                            <h3 className="fw-light">{editingId ? 'Editar Director' : 'Nuevo Director'}</h3>
                            <p className="small opacity-75">Administra los realizadores del catálogo cinematográfico.</p>
                        </div>
                    </Col>
                    <Col md={8}>
                        <Card.Body className="p-4">
                            {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
                            {success && <Alert variant="success" dismissible onClose={() => setSuccess(null)}>{success}</Alert>}
                            
                            <Form onSubmit={handleSubmit}>
                                <Row g={3}>
                                    <Col md={9}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small fw-bold text-uppercase">Nombres Completos</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="nombres" 
                                                value={formData.nombres} 
                                                onChange={handleChange} 
                                                required 
                                                placeholder="Ej: Francis Ford Coppola, Steven Spielberg..."
                                                className="form-control-lg border-2"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small fw-bold text-uppercase">Estado</Form.Label>
                                            <Form.Select 
                                                name="estado" 
                                                value={formData.estado} 
                                                onChange={handleChange}
                                                className="form-control-lg border-2"
                                            >
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="mt-4 d-flex gap-2">
                                    <Button variant={editingId ? "warning" : "primary"} type="submit" className="flex-grow-1 py-3 fw-bold shadow-sm">
                                        {editingId ? 'Guardar Cambios' : 'Registrar Director'}
                                    </Button>
                                    {editingId && (
                                        <Button variant="outline-secondary" onClick={cancelEdit} className="px-4">
                                            Cancelar
                                        </Button>
                                    )}
                                </div>
                            </Form>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

            <div className="mb-3 d-flex align-items-center">
                <h3 className="mb-0">Plantel de Directores</h3>
                <span className="ms-3 badge rounded-pill bg-dark">{directores.length} Items</span>
            </div>

            <Card className="shadow-sm border-0">
                <Table responsive hover className="mb-0 align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th className="ps-4">NOMBRES</th>
                            <th className="text-center">ESTADO</th>
                            <th className="text-center">FECHA REGISTRO</th>
                            <th className="pe-4 text-center">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" className="text-center py-5">Cargando plantel...</td></tr>
                        ) : directores.length === 0 ? (
                            <tr><td colSpan="4" className="text-center py-5 text-muted">No hay directores registrados actualmente.</td></tr>
                        ) : (
                            directores.map((d) => (
                                <tr key={d._id}>
                                    <td className="ps-4 fw-bold text-dark">{d.nombres}</td>
                                    <td className="text-center">
                                        <Badge bg={d.estado === 'Activo' ? 'success' : 'danger'} pill>
                                            {d.estado}
                                        </Badge>
                                    </td>
                                    <td className="text-center small text-muted font-monospace">
                                        {new Date(d.fechaCreacion).toLocaleDateString()}
                                    </td>
                                    <td className="pe-4 text-center">
                                        <div className="btn-group shadow-sm rounded-pill overflow-hidden">
                                            <Button variant="outline-primary" size="sm" onClick={() => handleEdit(d)}>
                                                Editar
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(d._id)}>
                                                Eliminar
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Card>
        </div>
    );
};

export default Director;
