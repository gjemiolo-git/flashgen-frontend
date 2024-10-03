import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 'calc(100vh - 64px - 100px)',
                textAlign: 'center',
            }}
        >
            <Typography variant="h1" component="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
                Oops! Page not found.
            </Typography>
            <Typography variant="body1" gutterBottom>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                sx={{ mt: 2 }}
            >
                Go to Homepage
            </Button>
        </Box>
    );
}