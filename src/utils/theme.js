import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4CAF50', // A muted green
            light: '#81C784',
            dark: '#388E3C',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#FFA726', // A soft orange
            light: '#FFB74D',
            dark: '#F57C00',
            contrastText: '#000000',
        },
        background: {
            default: '#FAFAFA', // Very light gray
            paper: '#FFFFFF',
        },
        text: {
            primary: '#000000', // Black
            secondary: '#555555', // Dark gray
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#4CAF50',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                },
                containedPrimary: {
                    backgroundColor: '#4CAF50',
                    '&:hover': {
                        backgroundColor: '#388E3C',
                    },
                },
                containedSecondary: {
                    backgroundColor: '#FFA726',
                    '&:hover': {
                        backgroundColor: '#F57C00',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                },
            },
        },
    },
    typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            color: '#4CAF50',
        },
        h2: {
            fontWeight: 600,
            color: '#4CAF50',
        },
        body1: {
            color: '#000000',
        },
        body2: {
            color: '#555555',
        },
        button: {
            fontWeight: 600,
        },
    },
});

export default theme;
