import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, useTheme, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NavButton = ({ to, children, onClick }) => {
    const location = useLocation();
    const theme = useTheme();
    const isActive = location.pathname === to;

    return (
        <Button
            color="inherit"
            component={RouterLink}
            to={to}
            onClick={onClick}
            sx={{
                backgroundColor: isActive ? theme.palette.primary.dark : 'transparent',
                '&:hover': {
                    backgroundColor: isActive ? theme.palette.primary.dark : 'rgba(255, 255, 255, 0.08)',
                },
            }}
        >
            {children}
        </Button>
    );
};

function Header({ darkMode, toggleDarkMode, isAuthenticated, notificationCount }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const menuItems = [
        { to: '/', label: 'Home' },
        { to: '/create', label: 'Create' },
        { to: '/library', label: 'Library' },
        ...(isAuthenticated
            ? [{ to: '/dashboard', label: 'Dashboard' }, { to: '/logout', label: 'Logout' }]
            : [{ to: '/login', label: 'Login' }, { to: '/register', label: 'Register' }]),
    ];

    return (
        <AppBar position="sticky">
            <Toolbar>
                <FlashOnIcon sx={{ mr: 1 }} />
                <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        flexGrow: 1,
                    }}
                >
                    {process.env.REACT_APP_NAME}
                </Typography>

                {isAuthenticated && !isMobile && (
                    <IconButton color="inherit">
                        <Badge badgeContent={notificationCount} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                )}

                <IconButton onClick={toggleDarkMode} color="inherit">
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>

                {isMobile ? (
                    <>
                        <IconButton color="inherit" onClick={handleMenu}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {menuItems.map((item) => (
                                <MenuItem key={item.to} onClick={handleClose}>
                                    <NavButton to={item.to}>{item.label}</NavButton>
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                ) : (
                    menuItems.map((item) => (
                        <NavButton key={item.to} to={item.to}>
                            {item.label}
                        </NavButton>
                    ))
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
