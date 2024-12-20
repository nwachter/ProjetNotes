import axios from 'axios';

const api = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true 
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

export const fetchAllNotesFromLS = () => JSON.parse(localStorage.getItem('notes')) || [];

export const getNotesByCreatorId = async (creator_id) => {
    try {
        const response = await api.get(`/notes/by-creator/${creator_id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch notes of creator #${creator_id}:`, error);
        throw error;
    }
};

export const getNoteById = async (id) => {
    try {
        const response = await api.get(`/notes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch note by id:', error);
        throw error;
    }
};

export const createNoteInLS = (note) => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    return note;
};

export const createNote = async (data) => {
    try {
        const response = await api.post('/notes', data);
        return response.data;
    } catch (error) {
        console.error('Failed to create note:', error);
        throw error;
    }
};

export const updateNote = async (id, data) => {
    try {
        const response = await api.put(`/notes/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Failed to update note:', error);
        throw error;
    }
};

export const deleteNote = async (id) => {
    try {
        const response = await api.delete(`/notes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete note:', error);
        throw error;
    }
};