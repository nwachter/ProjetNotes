import { jwtDecode } from 'jwt-decode';

export const decryptToken = (tokenKey) => {
    try {

        //Get cookie named "token"
        const tokenFromCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (tokenFromCookie !== undefined) {
            console.log("Cookie : ", tokenFromCookie);
        }
        const tokenFromLS = localStorage.getItem(tokenKey);
        const token = (tokenFromCookie ? tokenFromCookie.split('=')[1] : null) || tokenFromLS;

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
