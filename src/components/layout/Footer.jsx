import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body1" align="center">
                    © {new Date().getFullYear()} FlashGen - Smart Flashcard Generator
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                    <Link color="inherit" href="/privacy">
                        Privacy Policy
                    </Link>
                    {' | '}
                    <Link color="inherit" href="/terms">
                        Terms of Service
                    </Link>
                    {' | '}
                    <Link color="inherit" href="/about">
                        About Us
                    </Link>
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
