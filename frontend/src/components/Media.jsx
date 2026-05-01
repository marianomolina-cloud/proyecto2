import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Table, Form, Button, Row, Col, Card, Alert, Badge } from 'react-bootstrap';

const Media = () => {
    const [mediaList, setMediaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [editingId, setEditingId] = useState(null);

    // Form states
    const [formData, setFormData] = useState({
        titulo: '',
        sinopsis: '',
        urlPelicula: '',
        imagenPortada: '',
        anioEstreno: new Date().getFullYear(),
        generoPrincipal: '',
        directorPrincipal: '',
        productora: '',
        tipo: ''
    });

    // Options for dropdowns
    const [options, setOptions] = useState({
        generos: [],
        directores: [],
        productoras: [],
        tipos: []
    });

    useEffect(() => {
        fetchData();
        fetchOptions();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await api.get('/media');
            setMediaList(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar las películas');
            setLoading(false);
        }
    };

    const fetchOptions = async () => {
        try {
            const [gen, dir, prod, tip] = await Promise.all([
                api.get('/generos'),
                api.get('/directores'),
                api.get('/productoras'),
                api.get('/tipos')
            ]);
            setOptions({
                generos: gen.data.filter(g => g.estado === 'Activo'),
                directores: dir.data.filter(d => d.estado === 'Activo'),
                productoras: prod.data.filter(p => p.estado === 'Activo'),
                tipos: tip.data
            });
        } catch (err) {
            console.error('Error al cargar opciones', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (media) => {
        setEditingId(media._id);
        setFormData({
            titulo: media.titulo,
            sinopsis: media.sinopsis || '',
            urlPelicula: media.urlPelicula,
            imagenPortada: media.imagenPortada || '',
            anioEstreno: media.anioEstreno,
            generoPrincipal: media.generoPrincipal?._id || '',
            directorPrincipal: media.directorPrincipal?._id || '',
            productora: media.productora?._id || '',
            tipo: media.tipo?._id || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Desea eliminar esta producción del catálogo?')) {
            try {
                await api.delete(`/media/${id}`);
                setSuccess('Producción eliminada correctamente.');
                fetchData();
            } catch (err) {
                setError('No se pudo eliminar el registro.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            if (editingId) {
                await api.put(`/media/${editingId}`, formData);
                setSuccess('Producción actualizada correctamente.');
            } else {
                await api.post('/media', formData);
                setSuccess('Película guardada correctamente. El serial fue generado automáticamente.');
            }
            
            setFormData({
                titulo: '',
                sinopsis: '',
                urlPelicula: '',
                imagenPortada: '',
                anioEstreno: new Date().getFullYear(),
                generoPrincipal: '',
                directorPrincipal: '',
                productora: '',
                tipo: ''
            });
            setEditingId(null);
            fetchData();
        } catch (err) {
            setError(err.response?.data?.msj || 'Error al procesar la solicitud');
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({
            titulo: '',
            sinopsis: '',
            urlPelicula: '',
            imagenPortada: '',
            anioEstreno: new Date().getFullYear(),
            generoPrincipal: '',
            directorPrincipal: '',
            productora: '',
            tipo: ''
        });
    };

    return (
        <div className="mt-4 animate__animated animate__fadeIn">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                <h2 className="fw-bold text-dark">Core: Gestión de Películas y Series</h2>
                <Badge bg="primary" className="p-2">Módulo Principal</Badge>
            </div>

            <Card className="mb-5 shadow border-0 overflow-hidden">
                <Row className="g-0">
                    <Col md={4} className={`d-flex align-items-center justify-content-center text-white p-4 ${editingId ? 'bg-warning' : 'bg-primary'}`}>
                        <div className="text-center">
                            <i className={`bi ${editingId ? 'bi-pencil-square' : 'bi-film'} display-1 mb-3`}></i>
                            <h3 className="fw-light">{editingId ? 'Editar Producción' : 'Nueva Producción'}</h3>
                            <p className="small opacity-75">
                                {editingId ? 'Modifique los datos técnicos de la obra.' : 'El serial se generará automáticamente tras el registro.'}
                            </p>
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
                                            <Form.Label className="small fw-bold text-uppercase">Título de la Obra</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="titulo" 
                                                value={formData.titulo} 
                                                onChange={handleChange} 
                                                required 
                                                placeholder="Ej: El Padrino"
                                                className="form-control-lg border-2"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small fw-bold text-uppercase">Año</Form.Label>
                                            <Form.Control 
                                                type="number" 
                                                name="anioEstreno" 
                                                value={formData.anioEstreno} 
                                                onChange={handleChange} 
                                                required
                                                className="form-control-lg border-2"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label className="small fw-bold text-uppercase">Sinopsis / Resumen</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={2} 
                                        name="sinopsis" 
                                        value={formData.sinopsis} 
                                        onChange={handleChange} 
                                        placeholder="Breve descripción de la trama..."
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small fw-bold text-uppercase">URL de la Película</Form.Label>
                                            <Form.Control 
                                                type="url" 
                                                name="urlPelicula" 
                                                value={formData.urlPelicula} 
                                                onChange={handleChange} 
                                                required
                                                placeholder="https://example.com/video"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="small fw-bold text-uppercase">URL Imagen de Portada</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="imagenPortada" 
                                                value={formData.imagenPortada} 
                                                onChange={handleChange} 
                                                placeholder="https://example.com/poster.jpg"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="bg-light p-3 rounded mb-4">
                                    <Col md={3}>
                                        <Form.Group className="mb-3 mb-md-0">
                                            <Form.Label className="small fw-bold">Género</Form.Label>
                                            <Form.Select name="generoPrincipal" value={formData.generoPrincipal} onChange={handleChange} required>
                                                <option value="">Seleccione...</option>
                                                {options.generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-3 mb-md-0">
                                            <Form.Label className="small fw-bold">Director</Form.Label>
                                            <Form.Select name="directorPrincipal" value={formData.directorPrincipal} onChange={handleChange} required>
                                                <option value="">Seleccione...</option>
                                                {options.directores.map(d => <option key={d._id} value={d._id}>{d.nombres}</option>)}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-3 mb-md-0">
                                            <Form.Label className="small fw-bold">Productora</Form.Label>
                                            <Form.Select name="productora" value={formData.productora} onChange={handleChange} required>
                                                <option value="">Seleccione...</option>
                                                {options.productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label className="small fw-bold">Clasificación</Form.Label>
                                            <Form.Select name="tipo" value={formData.tipo} onChange={handleChange} required>
                                                <option value="">Seleccione...</option>
                                                {options.tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="d-flex gap-2">
                                    <Button variant={editingId ? "warning" : "primary"} type="submit" className={`w-100 py-3 shadow-sm fw-bold ${editingId ? 'text-dark' : 'text-white'}`}>
                                        {editingId ? 'Guardar Cambios' : 'Finalizar Registro y Generar Serial'}
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
                <h3 className="mb-0">Inventario Registrado</h3>
                <span className="ms-3 badge rounded-pill bg-dark">{mediaList.length} Items</span>
            </div>

            <Card className="shadow-sm border-0">
                <Table responsive hover className="mb-0 align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th className="ps-4 text-center">PORTADA</th>
                            <th>SERIAL ID</th>
                            <th>TÍTULO</th>
                            <th>ESTRENO</th>
                            <th>GÉNERO / PRODUCTORA</th>
                            <th className="pe-4 text-center">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" className="text-center py-5">Cargando catálogo...</td></tr>
                        ) : mediaList.length === 0 ? (
                            <tr><td colSpan="6" className="text-center py-5 text-muted">No hay producciones registradas en el núcleo de datos.</td></tr>
                        ) : (
                            mediaList.map((m) => (
                                <tr key={m._id}>
                                    <td className="ps-4 text-center">
                                        <div className="rounded shadow-sm overflow-hidden" style={{ width: '50px', height: '75px', margin: '0 auto' }}>
                                            {m.imagenPortada ? (
                                                <img 
                                                    src={m.imagenPortada} 
                                                    alt={m.titulo} 
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/50x75?text=NO+IMG'; }}
                                                />
                                            ) : (
                                                <div className="bg-secondary d-flex align-items-center justify-content-center h-100 text-white">
                                                    <i className="bi bi-camera-video"></i>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="font-monospace fw-bold bg-warning px-2 py-1 rounded small">
                                            {m.serial}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="fw-bold text-dark">{m.titulo}</div>
                                        <div className="small text-muted text-truncate" style={{maxWidth: '300px'}}>{m.sinopsis}</div>
                                    </td>
                                    <td><Badge bg="light" text="dark" className="border">{m.anioEstreno}</Badge></td>
                                    <td>
                                        <div className="small fw-bold">{m.generoPrincipal?.nombre}</div>
                                        <div className="x-small text-muted">{m.productora?.nombre}</div>
                                    </td>
                                    <td className="pe-4 text-center">
                                        <div className="btn-group shadow-sm rounded-pill overflow-hidden">
                                            <a href={m.urlPelicula} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-success">
                                                Ver
                                            </a>
                                            <Button variant="outline-primary" size="sm" onClick={() => handleEdit(m)}>
                                                Editar
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(m._id)}>
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

export default Media;
