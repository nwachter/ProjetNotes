import axios from 'axios';

const api = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const fetchAllNotes = async () => {
    try {
        const response = await api.get('/notes');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch notes:', error);
        throw error;
    }
};