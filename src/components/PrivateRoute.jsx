import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setMessage } from '../redux/slices/authSlice';

const PrivateRoute = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user) !== null;
    const location = useLocation();

    if (!user) {
        dispatch(setMessage({ warning: 'You need to be logged in to visit dashboard.' }));
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    return <Outlet />;
}


const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user) !== null;
    const location = useLocation();

    if (!user) {
        dispatch(setMessage({ warning: 'You need to be logged in to visit dashboard.' }));
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export { PrivateRoute, ProtectedRoute };
