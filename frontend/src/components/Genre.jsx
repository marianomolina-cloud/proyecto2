import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Table, Form, Button, Row, Col, Card, Alert, Badge } from 'react-bootstrap';

const Genre = () => {
    const [generos, setGeneros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        estado: 'Activo'
    });

    useEffect(() => {
        fetchGeneros();
    }, []);

    const fetchGeneros = async () => {
        try {
            setLoading(true);
            const response = await api.get('/generos');
            setGeneros(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar géneros');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (genero) => {
        setEditingId(genero._id);
        setFormData({
            nombre: genero.nombre,
            descripcion: genero.descripcion || '',
            estado: genero.estado
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este género?')) {
            try {
                await api.delete(`/generos/${id}`);
                setSuccess('Género eliminado correctamente');
                fetchGeneros();
            } catch (err) {
                setError('No se pudo eliminar el género');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            if (editingId) {
                await api.put(`/generos/${editingId}`, formData);
                setSuccess('Género actualizado correctamente');
            } else {
                await api.post('/generos', formData);
                setSuccess('Género registrado correctamente');
            }
            setFormData({ nombre: '', descripcion: '', estado: 'Activo' });
            setEditingId(null);
            fetchGeneros();
        } catch (err) {
            setError(err.response?.data?.msj || 'Error al procesar la solicitud');
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({ nombre: '', descripcion: '', estado: 'Activo' });
    };

    return (
        <div className="mt-4 animate__animated animate__fadeIn">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                <h2 className="fw-bold text-dark">Maestros: Gestión de Géneros</h2>
                <Badge bg="success" className="p-2">Configuración</Badge>
            </div>

            <Card className="mb-5 shadow border-0 overflow-hidden">
                <Row className="g-0">
                    <Col md={4} className="bg-success d-flex align-items-center justify-content-center text-white p-4">
                        <div className="text-center">
                            <i className={`bi ${editingId ? 'bi-pencil-square' : 'bi-plus-circle'} display-1 mb-3`}></i>
                            <h3 className="fw-light">{editingId ? 'Editar Género' : 'Nuevo Género'}</h3>
                            <p className="small opacity-75">Define las categorías para el catálogo de películas.</p>
                        </div>
                    </Col>
                    <Col md={8}>
                        <Card.Body className="p-4">
                            {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
                            {success && <Alert variant="success" dismissible onClose={() => setSuccess(null)}>{success}</Alert>}
                            
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={8}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small fw-bold text-uppercase">Nombre del Género</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="nombre" 
                                                value={formData.nombre} 
                                                onChange={handleChange} 
                                                required 
                                                placeholder="Ej: Acción, Comedia, Drama..."
                                                className="border-2"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small fw-bold text-uppercase">Estado</Form.Label>
                                            <Form.Select 
                                                name="estado" 
                                                value={formData.estado} 
                                                onChange={handleChange}
                                                className="border-2"
                                            >
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-4">
                                    <Form.Label className="small fw-bold text-uppercase">Descripción (Opcional)</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={2} 
                                        name="descripcion" 
                                        value={formData.descripcion} 
                                        onChange={handleChange}
                                        placeholder="Describa brevemente el género..."
                                    />
                                </Form.Group>
                                <div className="d-flex gap-2">
                                    <Button variant={editingId ? "warning" : "success"} type="submit" className="flex-grow-1 py-2 fw-bold shadow-sm">
                                        {editingId ? 'Guardar Cambios' : 'Registrar Género'}
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
                <h3 className="mb-0">Géneros Disponibles</h3>
                <span className="ms-3 badge rounded-pill bg-dark">{generos.length} Items</span>
            </div>

            <Card className="shadow-sm border-0">
                <Table responsive hover className="mb-0 align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th className="ps-4">GÉNERO</th>
                            <th>DESCRIPCIÓN</th>
                            <th>ESTADO</th>
                            <th className="pe-4 text-center">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" className="text-center py-5">Cargando catálogo...</td></tr>
                        ) : generos.length === 0 ? (
                            <tr><td colSpan="4" className="text-center py-5 text-muted">No existen géneros configurados.</td></tr>
                        ) : (
                            generos.map((g) => (
                                <tr key={g._id}>
                                    <td className="ps-4 fw-bold text-dark">{g.nombre}</td>
                                    <td className="text-muted small">{g.descripcion || 'Sin descripción disponible'}</td>
                                    <td>
                                        <Badge bg={g.estado === 'Activo' ? 'success' : 'danger'} pill>
                                            {g.estado}
                                        </Badge>
                                    </td>
                                    <td className="pe-4 text-center">
                                        <div className="btn-group shadow-sm rounded-pill overflow-hidden">
                                            <Button variant="outline-primary" size="sm" onClick={() => handleEdit(g)}>
                                                Editar
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(g._id)}>
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

export default Genre;
