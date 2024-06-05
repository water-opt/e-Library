import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import RoleContext from '../components/RoleContext';
import IsLoginContext from "./IsLoginContext";

const useLogout = () => {
    const { setRole } = useContext(RoleContext);
    const { setLogin } = useContext(IsLoginContext);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            setRole(null);
            setLogin(false);

            const response = await axios.post('/api/user/logout');

            if (response.status === 200) {
                console.log(response.data);
                navigate('/user/login');
            } else {
                console.log(`Unexpected response status: ${response.status}`);
                console.log(response.data);
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return logout;
};

export default useLogout;
