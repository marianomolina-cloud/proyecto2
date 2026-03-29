import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Media from './components/Media';
import Genre from './components/Genre';
import Director from './components/Director';
import Producer from './components/Producer';
import Type from './components/Type';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">🎬 MoviePanel</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/generos">Géneros</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/directores">Directores</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/productoras">Productoras</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/tipos">Tipos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active btn btn-primary text-white ms-lg-3 px-4" href="/media">Películas</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container pb-5">
        <Routes>
          <Route path="/" element={
            <div className="text-center py-5">
              <h1 className="display-4 fw-bold">Gestión de Contenido Audiovisual</h1>
              <p className="lead text-muted">Bienvenido al Panel Administrativo Core de Películas y Series.</p>
              <hr className="my-4" />
              <div className="row g-4 mt-2">
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm border-0 bg-light p-3">
                    <h3>Maestros</h3>
                    <p>Gestiona Géneros, Directores y más.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm border-0 bg-primary text-white p-3">
                    <h3>Core</h3>
                    <p>Registra tus Películas y Series favoritas.</p>
                    <a href="/media" className="btn btn-outline-light mt-auto">Administrar</a>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 shadow-sm border-0 bg-light p-3">
                    <h3>Reportes</h3>
                    <p>Próximamente visualiza estadísticas.</p>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/generos" element={<Genre />} />
          <Route path="/directores" element={<Director />} />
          <Route path="/productoras" element={<Producer />} />
          <Route path="/tipos" element={<Type />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
