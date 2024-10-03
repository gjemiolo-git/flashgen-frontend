import React from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

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
                    <MuiLink component={RouterLink} to="/privacy" color="inherit">
                        Privacy Policy
                    </MuiLink>
                    {' | '}
                    <MuiLink component={RouterLink} to="/terms" color="inherit">
                        Terms of Service
                    </MuiLink>
                    {' | '}
                    <MuiLink component={RouterLink} to="/about" color="inherit">
                        About Us
                    </MuiLink>
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
