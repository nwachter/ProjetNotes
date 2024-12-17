import { jwtDecode } from 'jwt-decode';

export const decryptToken = (tokenKey) => {
    try {
        const token = localStorage.getItem(tokenKey);
        if (!token) {
            return null;
        }

        const decodedData = jwtDecode(token);
        return decodedData;
    } catch (error) {
        console.error("Failed to decrypt token:", error);
        return null;
    }
};
