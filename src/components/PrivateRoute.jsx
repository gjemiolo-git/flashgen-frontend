import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Container, Box, Paper, Skeleton, Typography } from '@mui/material';

const PrivateRoute = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsAuth(false);
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography component="h1" variant="h5">
                            Loading...
                        </Typography>
                        <Skeleton width={350} variant="text" sx={{ fontSize: '2rem' }} />
                    </Box>
                </Paper>
            </Container>
        )
    }

    return isAuth ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoute;
