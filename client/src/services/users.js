import axios from 'axios';

const api = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true 
});

export const fetchAllUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user by id:', error);
        throw error;
    }
};