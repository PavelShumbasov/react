import axios from 'axios';

const BASE_URL = 'http://192.168.1.126:5000';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

export default api;