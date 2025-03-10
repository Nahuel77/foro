import axios from 'axios';

const API = axios.create({
    //NOTA A mi Mismo:
    //HTTP por ser desarrollo local.
    //Si se desplega a un server configurar certificado SSL
    baseURL: 'http://localhost:5000',
});

API.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
