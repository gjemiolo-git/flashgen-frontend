import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import lightTheme from '../../utils/theme';
import darkTheme from '../../utils/theme2';
import Header from './Header';
import Footer from './Footer';
import Notifications from './Notifications';


function Layout() {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = Cookies.get('darkMode');
        return savedMode === 'true';
    });

    useEffect(() => {
        Cookies.set('darkMode', darkMode.toString(), { expires: 365, sameSite: 'Lax' });
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <Notifications />
                <Container component="main" sx={{ flex: 1, py: 3 }}>
                    <Outlet />
                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    );
}

export default Layout;
