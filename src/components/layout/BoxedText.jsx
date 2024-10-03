import React from 'react';
import { Box, useTheme } from '@mui/material';

function BoxedText({ children }) {
    const theme = useTheme();

    return (
        <Box sx={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: theme.spacing(3),
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[1]
        }}>
            {children}
        </Box>
    );
}

export default BoxedText;
