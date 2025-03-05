import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// User-related API calls
export const getUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Chama-related API calls
export const getChamas = async () => {
    try {
        const response = await api.get('/chamas');
        return response.data;
    } catch (error) {
        console.error('Error fetching chamas:', error);
        throw error;
    }
};

// Add more API calls as needed