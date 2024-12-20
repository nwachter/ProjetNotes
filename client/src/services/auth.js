import axios from 'axios';



const api = axios.create({
    baseURL: '/api/v1/auth',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true  //Ajouter après url des get si besoin a la place
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


const register = async (data) => {
    try {
        const response = await api.post('/register', data);
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

const logout = async () => {
    try {
        const response = await api.post('/logout');
        return response.data;
    } catch (error) {
        console.error('Failed to logout:', error);
        throw error;
    }
};

const getUserInfo = async () => {
    try {
        const response = await api.get('/verify');
        return response.data;
    } catch (error) {
        console.error('Failed to verify token and get user info:', error);
        throw error;
    }
}
export { register, login, logout, getUserInfo };