import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { Container, Box, Paper, CircularProgress, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setMessage } from '../redux/slices/authSlice';

// const Spinner = () => {
//     return (
//         <Container component="main" maxWidth="xs">
//             <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
//                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                     <Typography component="h1" variant="h5">
//                         Loading...
//                     </Typography>
//                     <CircularProgress />
//                 </Box>
//             </Paper>
//         </Container>
//     );
// }

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
