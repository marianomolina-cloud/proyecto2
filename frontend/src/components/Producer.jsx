import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Table, Form, Button, Row, Col, Card, Alert, Badge } from 'react-bootstrap';

const Producer = () => {
    const [productoras, setProductoras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        nombre: '',
        slogan: '',
        descripcion: '',
        estado: 'Activo'
    });

    useEffect(() => {
        fetchProductoras();
    }, []);

    const fetchProductoras = async () => {
        try {
            setLoading(true);
            const response = await api.get('/productoras');
            setProductoras(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar productoras');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (productora) => {
        setEditingId(productora._id);
        setFormData({
            nombre: productora.nombre,
            slogan: productora.slogan || '',
            descripcion: productora.descripcion || '',
            estado: productora.estado
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta productora?')) {
            try {
                await api.delete(`/productoras/${id}`);
                setSuccess('Productora eliminada correctamente');
                fetchProductoras();
            } catch (err) {
                setError('No se pudo eliminar la productora');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            if (editingId) {
                await api.put(`/productoras/${editingId}`, formData);
                setSuccess('Productora actualizada correctamente');
            } else {
                await api.post('/productoras', formData);
                setSuccess('Productora registrada correctamente');
            }
            setFormData({ nombre: '', slogan: '', descripcion: '', estado: 'Activo' });
            setEditingId(null);
            fetchProductoras();
        } catch (err) {
            setError(err.response?.data?.msj || 'Error al procesar la solicitud');
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({ nombre: '', slogan: '', descripcion: '', estado: 'Activo' });
    };

    return (
        <div className="mt-4 animate__animated animate__fadeIn">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                <h2 className="fw-bold text-dark">Maestros: Gestión de Productoras</h2>
                <Badge bg="info" className="p-2 text-white">Configuración</Badge>
            </div>

            <Card className="mb-5 shadow border-0 overflow-hidden">
                <Row className="g-0">
                    <Col md={4} className="bg-info d-flex align-items-center justify-content-center text-white p-4">
                        <div className="text-center">
                            <i className={`bi ${editingId ? 'bi-buildings' : 'bi-plus-square-dotted'} display-1 mb-3`}></i>
                            <h3 className="fw-light">{editingId ? 'Editar Productora' : 'Nueva Productora'}</h3>
                            <p className="small opacity-75">Define las casas productoras asociadas al catálogo.</p>
                        </div>
                    </Col>
                    <Col md={8}>
                        <Card.Body className="p-4">
                            {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
                            {success && <Alert variant="success" dismissible onClose={() => setSuccess(null)}>{success}</Alert>}
                            
                            <Form onSubmit={handleSubmit}>
                                <Row g={3}>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small fw-bold text-uppercase">Nombre Empresa</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="nombre" 
                                                value={formData.nombre} 
                                                onChange={handleChange} 
                                                required 
                                                placeholder="Ej: Warner Bros, Sony Pictures..."
                                                className="border-2"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small fw-bold text-uppercase">Slogan Comercial</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="slogan" 
                                                value={formData.slogan} 
                                                onChange={handleChange} 
                                                placeholder="Ej: Dream BIG"
                                                className="border-2"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
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
                                    <Form.Label className="small fw-bold text-uppercase">Descripción de la Productora</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={2} 
                                        name="descripcion" 
                                        value={formData.descripcion} 
                                        onChange={handleChange}
                                        placeholder="Breve trayectoria o historia..."
                                    />
                                </Form.Group>

                                <div className="d-flex gap-2">
                                    <Button variant={editingId ? "warning" : "info"} type="submit" className="flex-grow-1 py-3 fw-bold shadow-sm text-white">
                                        {editingId ? 'Guardar Cambios' : 'Registrar Productora'}
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
                <h3 className="mb-0">Directorio de Empresas</h3>
                <span className="ms-3 badge rounded-pill bg-dark">{productoras.length} Items</span>
            </div>

            <Card className="shadow-sm border-0">
                <Table responsive hover className="mb-0 align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th className="ps-4">NOMBRE EMPRESA / SLOGAN</th>
                            <th>RESUMEN</th>
                            <th className="text-center">ESTADO</th>
                            <th className="pe-4 text-center">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4" className="text-center py-5">Cargando directorio...</td></tr>
                        ) : productoras.length === 0 ? (
                            <tr><td colSpan="4" className="text-center py-5 text-muted">No existen productoras registradas.</td></tr>
                        ) : (
                            productoras.map((p) => (
                                <tr key={p._id}>
                                    <td className="ps-4">
                                        <div className="fw-bold text-dark">{p.nombre}</div>
                                        {p.slogan && <div className="small text-muted fst-italic">"{p.slogan}"</div>}
                                    </td>
                                    <td className="text-muted small text-truncate" style={{maxWidth: '300px'}}>
                                        {p.descripcion || 'Información no disponible'}
                                    </td>
                                    <td className="text-center">
                                        <Badge bg={p.estado === 'Activo' ? 'success' : 'danger'} pill>
                                            {p.estado}
                                        </Badge>
                                    </td>
                                    <td className="pe-4 text-center">
                                        <div className="btn-group shadow-sm rounded-pill overflow-hidden">
                                            <Button variant="outline-primary" size="sm" onClick={() => handleEdit(p)}>
                                                Editar
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p._id)}>
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

export default Producer;
