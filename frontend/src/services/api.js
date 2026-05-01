import axios from 'axios';

// Cliente API apuntando al Backend de Express
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
