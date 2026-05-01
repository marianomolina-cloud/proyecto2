import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Table, Form, Button, Row, Col, Card, Alert, Badge } from 'react-bootstrap';

const Type = () => {
    const [tipos, setTipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: ''
    });

    useEffect(() => {
        fetchTipos();
    }, []);

    const fetchTipos = async () => {
        try {
            setLoading(true);
            const response = await api.get('/tipos');
            setTipos(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar tipos');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (tipo) => {
        setEditingId(tipo._id);
        setFormData({
            nombre: tipo.nombre,
            descripcion: tipo.descripcion || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta clasificación?')) {
            try {
                await api.delete(`/tipos/${id}`);
                setSuccess('Clasificación eliminada correctamente');
                fetchTipos();
            } catch (err) {
                setError('No se pudo eliminar el registro');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            if (editingId) {
                await api.put(`/tipos/${editingId}`, formData);
                setSuccess('Clasificación actualizada correctamente');
            } else {
                await api.post('/tipos', formData);
                setSuccess('Clasificación registrada correctamente');
            }
            setFormData({ nombre: '', descripcion: '' });
            setEditingId(null);
            fetchTipos();
        } catch (err) {
            setError(err.response?.data?.msj || 'Error al procesar la solicitud');
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({ nombre: '', descripcion: '' });
    };

    return (
        <div className="mt-4 animate__animated animate__fadeIn">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                <h2 className="fw-bold text-dark">Maestros: Gestión de Tipos / Clasificaciones</h2>
                <Badge bg="warning" className="p-2 text-dark">Categorización</Badge>
            </div>

            <Card className="mb-5 shadow border-0 overflow-hidden">
                <Row className="g-0">
                    <Col md={4} className="bg-warning d-flex align-items-center justify-content-center text-dark p-4">
                        <div className="text-center">
                            <i className={`bi ${editingId ? 'bi-tags' : 'bi-patch-plus'} display-1 mb-3`}></i>
                            <h3 className="fw-light">{editingId ? 'Editar Tipo' : 'Nueva Clasificación'}</h3>
                            <p className="small opacity-75">Define si el contenido es Película, Serie, Documental, etc.</p>
                        </div>
                    </Col>
                    <Col md={8}>
                        <Card.Body className="p-4">
                            {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
                            {success && <Alert variant="success" dismissible onClose={() => setSuccess(null)}>{success}</Alert>}
                            
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-bold text-uppercase">Nombre del Tipo</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="nombre" 
                                        value={formData.nombre} 
                                        onChange={handleChange} 
                                        required 
                                        placeholder="Ej: Película, Serie, Cortometraje..."
                                        className="form-control-lg border-2"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="small fw-bold text-uppercase">Descripción Técnica</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={3} 
                                        name="descripcion" 
                                        value={formData.descripcion} 
                                        onChange={handleChange}
                                        required
                                        placeholder="Defina las características de este tipo de contenido..."
                                    />
                                </Form.Group>

                                <div className="d-flex gap-2">
                                    <Button variant={editingId ? "warning" : "dark"} type="submit" className={`flex-grow-1 py-3 fw-bold shadow-sm ${editingId ? 'text-dark' : 'text-white'}`}>
                                        {editingId ? 'Guardar Cambios' : 'Registrar Clasificación'}
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
                <h3 className="mb-0">Categorías de Contenido</h3>
                <span className="ms-3 badge rounded-pill bg-dark">{tipos.length} Items</span>
            </div>

            <Card className="shadow-sm border-0">
                <Table responsive hover className="mb-0 align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th className="ps-4">TIPO / CLASIFICACIÓN</th>
                            <th>DESCRIPCIÓN</th>
                            <th className="pe-4 text-center">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="3" className="text-center py-5">Cargando categorías...</td></tr>
                        ) : tipos.length === 0 ? (
                            <tr><td colSpan="3" className="text-center py-5 text-muted">No existen clasificaciones registradas.</td></tr>
                        ) : (
                            tipos.map((t) => (
                                <tr key={t._id}>
                                    <td className="ps-4 fw-bold text-dark">{t.nombre}</td>
                                    <td className="text-muted small">
                                        {t.descripcion}
                                    </td>
                                    <td className="pe-4 text-center">
                                        <div className="btn-group shadow-sm rounded-pill overflow-hidden">
                                            <Button variant="outline-primary" size="sm" onClick={() => handleEdit(t)}>
                                                Editar
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(t._id)}>
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

export default Type;
