import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export const storeToken = (token) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    if (!decodedToken) {
        return true;
    }

    const expirationTime = decodedToken.exp * 1000;
    return Date.now() > expirationTime;
};

export const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
        return null;
    }
    return token;
};

export const login = async (navigate, setLogin, setRole, credentials) => {
    try {
        const response = await axios.post('/api/user/login', credentials);
        const { token } = response.data;
        
        if (!token) {
            throw new Error('Login failed: No token provided');
        }

        const decodedToken = jwtDecode(token);

        if (!decodedToken || typeof decodedToken.role === 'undefined') {
            throw new Error('An token error occurred');
        }
        
        storeToken(token);
        setRole(decodedToken.role);
        setLogin(true);
        navigate('/user/home');
    } catch (error) {
        throw new Error(error);
    }
};

export const logoutUser = () => {
    removeToken();
};

export const getUserRole = () => {
    const token = getToken();
    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.role;
    }
    return null;
};
