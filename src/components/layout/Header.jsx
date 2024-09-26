import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Header({ darkMode, toggleDarkMode }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <FlashOnIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        flexGrow: 1,
                    }}
                >
                    FlashGen
                </Typography>
                <Button color="inherit" component={RouterLink} to="/">
                    Home
                </Button>
                <Button color="inherit" component={RouterLink} to="/create">
                    Create
                </Button>
                <Button color="inherit" component={RouterLink} to="/library">
                    Library
                </Button>
                <Button color="inherit" component={RouterLink} to="/login">
                    Login
                </Button>
                <Button color="inherit" component={RouterLink} to="/register">
                    Register
                </Button>
                <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
