import axios from 'axios';



const api = axios.create({
    baseURL: '/api/v1/auth',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


const register = async (username, password) => {
    try {
        const response = await api.post('/register', { username, password });
        console.log("Registered ! Info : ", response.data);

        return response.data;
    } catch (error) {
        console.error('Failed to register:', error);
        throw error;
    }
};

const login = async (username, password) => {
    try {
        const response = await api.post('/login', { username, password });
        return response.data;
    } catch (error) {
        console.error('Failed to login:', error);
        throw error;
    }
};

export { register, login };