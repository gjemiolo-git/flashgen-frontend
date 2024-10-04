import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../utils/logout';
import Spinner from '../components/Spinner';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const handleLogout = async () => {
            if (user) {
                try {
                    await logoutUser(dispatch, navigate, true);
                } catch (error) {
                    console.error('Logout failed:', error);
                    navigate('/');
                }
            } else {
                navigate('/login');
            }
        };

        handleLogout();
    }, [dispatch, navigate, user]);

    return <Spinner />;
};

export default Logout;
