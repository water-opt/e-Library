import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { logoutUser } from '../services/auth';
import RoleContext from '../components/RoleContext';
import IsLoginContext from "./IsLoginContext";

const useLogout = () => {
    const { setRole } = useContext(RoleContext);
    const { setLogin } = useContext(IsLoginContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const logout = async () => {
        try {
            setRole(null);
            setLogin(false);

            const response = await axios.post('/api/user/logout');

            if (response.status === 200) {
                console.log(response.data);
                logoutUser();
                navigate('/user/login');
            } else if (response.status === 404){
                setError('email not found')
            } else {
                console.log(`Unexpected response status: ${response.status}`);
                console.log(response.data);
                setError('Unexpected error occurred');
            }
        } catch (error) {
            console.error('Logout failed:', error);
            setError('Logout failed. Please try again later.');
        }
    };

    return { logout, error };
};

export default useLogout;
