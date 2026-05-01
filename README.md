# 🎬 Proyecto de Gestión de Películas (Full Stack)

Este es un sistema completo de gestión de películas que permite administrar directores, géneros, productoras, tipos y el contenido multimedia (películas/series). El proyecto está dividido en una arquitectura de **Backend (Node.js/Express)** y **Frontend (React)**.

## 🚀 Características

- **Gestión CRUD Completa**: Módulos para administrar Películas, Directores, Géneros, Productoras y Tipos.
- **Base de Datos NoSQL**: Integración con MongoDB Atlas.
- **Interfaz Premium**: Diseño moderno y responsivo utilizando React y Bootstrap.
- **Arquitectura Limpia**: Separación clara entre lógica de negocio, rutas y controladores en el backend.

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js**: Entorno de ejecución.
- **Express**: Framework para la API REST.
- **Mongoose**: Modelado de objetos para MongoDB.
- **CORS & Dotenv**: Seguridad y configuración de entorno.

### Frontend
- **React (Vite)**: Framework de UI.
- **React Router DOM**: Navegación entre módulos.
- **Axios**: Consumo de la API.
- **Bootstrap & React-Bootstrap**: Estilizado y componentes UI.

## 📂 Estructura del Proyecto

```text
/
├── backend/          # Servidor de API y conexión a base de datos
└── frontend/         # Aplicación cliente (Interfaz de usuario)
```

## ⚙️ Configuración e Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/marianomolina-cloud/proyecto2.git
cd proyecto2
```

### 2. Configurar el Backend
1. Entra a la carpeta backend: `cd backend`
2. Instala las dependencias: `npm install`
3. Crea un archivo `.env` basado en `.env.example` y configura tu `MONGO_URI` y `PORT`.
4. Inicia el servidor: `npm run dev`

### 3. Configurar el Frontend
1. Entra a la carpeta frontend: `cd ../frontend`
2. Instala las dependencias: `npm install`
3. Inicia la aplicación: `npm run dev`

## 📄 Licencia

Este proyecto fue desarrollado como parte de un proceso de aprendizaje de desarrollo Full Stack.
