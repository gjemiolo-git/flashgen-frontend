import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import lightTheme from '../../utils/theme';
import darkTheme from '../../utils/theme2';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

function Layout() {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <Container component="main" sx={{ flex: 1, py: 3 }}>
                    <Outlet />
                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    );
}

export default Layout;
