import { api } from "../config/config"

// import { ObjectId } from 'bson';

const getAllTags = async () => {
    try {
        const response = await api.get('/tags');
        return response.data;
    }
    catch (error) {
        console.error('Failed to fetch tags:', error);
        throw error;
    }
}

const getAllTagsFromLS = () => {
    try {
        const tags = JSON.parse(localStorage.getItem('tags')) || [];
        return tags;
    } catch (error) {
        console.error('Failed to fetch tags from LocalStorage:', error);
        throw error;
    }
}

const getTagById = async (id) => {
    try {
        const response = await api.get(`/tags/${id}`);
        return response.data;
    }
    catch (error) {
        console.error(`Failed to fetch tag #${id} :`, error);
        throw error;

    }
}

const getTagByIdFromLS = (id) => {
    try {
        const tags = JSON.parse(localStorage.getItem('tags')) || [];
        return tags.find(tag => tag.id === id);
    } catch (error) {
        console.error(`Failed to fetch tag #${id} from LocalStorage:`, error);
        throw error;
    }
}

const createTag = async (data) => {
    try {
        const response = await api.post('/tags', data);
        return response.data;
    }
    catch (error) {
        console.error('Failed to create tag:', error);
        throw error;
    }
}

const createTagInLS = (data) => {
    try {
        const tags = JSON.parse(localStorage.getItem('tags')) || [];
        tags.push(data);
        localStorage.setItem('tags', JSON.stringify(tags));
        return data;
    } catch (error) {
        console.error('Failed to create tag in LocalStorage:', error);
        throw error;
    }
}

const updateTag = async (id, data) => {
    try {
        const response = await api.patch(`/tags/${id}`, data);
        return response.data;
    }
    catch (error) {
        console.error('Failed to update tag:', error);
        throw error;
    }
}

const updateTagInLS = (id, data) => {
    try {
        const tags = JSON.parse(localStorage.getItem('tags')) || [];
        const index = tags.findIndex(tag => tag.id === id);
        if (index !== -1) {
            tags[index] = data;
            localStorage.setItem('tags', JSON.stringify(tags));
            return data;
        }
        throw new Error('Tag not found');
    } catch (error) {
        console.error('Failed to update tag in LocalStorage:', error);
        throw error;
    }
}

const deleteTag = async (id) => {
    try {
        const response = await api.delete(`/tags/${id}`);
        return response.data;
    }
    catch (error) {
        console.error('Failed to delete tag:', error);
        throw error;
    }
}

const deleteTagInLS = (id) => {
    try {
        const tags = JSON.parse(localStorage.getItem('tags')) ?? [];
        const filteredTags = tags.filter(tag => tag._id !== id);
        localStorage.setItem('tags', JSON.stringify(filteredTags));
    } catch (error) {
        console.error('Failed to delete tag from LocalStorage:', error);
        throw error;
    }
}



export { getAllTags, getTagById, createTag, updateTag, deleteTag, getAllTagsFromLS, getTagByIdFromLS, createTagInLS, updateTagInLS, deleteTagInLS };