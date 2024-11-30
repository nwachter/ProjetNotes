// import axios from 'axios';

// export const fetchAllNotes = async () => {
//     try {
//         const response = await axios.get('/api/v1/notes');
//         return response.data;
//     } catch (error) {
//         console.error('Failed to fetch notes:', error);
//         throw error;
//     }
// };

import axios from 'axios';

// const baseURL = process.env.NODE_ENV === 'dev'
//     ? process.env.REACT_APP_API_URL  // Development server
//     : '';                      // Production server (same origin)

// const api = axios.create({
//     baseURL,
//     withCredentials: true
// });

// const api = axios.create({
//     baseURL: 'http://localhost:4000',  // Explicitly set the backend URL
// });

export const fetchAllNotes = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/v1/notes',
            //      {
            //     headers: {
            //         Accept: 'application/json'
            //     }
            // }
        ); return response.data;
    } catch (error) {
        console.error('Failed to fetch notes:', error);
        throw error;
    }
};