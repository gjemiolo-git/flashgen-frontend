import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#81C784', // A lighter green for dark mode
            light: '#A5D6A7',
            dark: '#66BB6A',
            contrastText: '#000000',
        },
        secondary: {
            main: '#4DB6AC', // A teal color for dark mode
            light: '#80CBC4',
            dark: '#26A69A',

            contrastText: '#000000',
        },
        background: {
            default: '#303030',
            paper: '#424242',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#BDBDBD',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#424242',
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
                    backgroundColor: '#81C784',
                    '&:hover': {
                        backgroundColor: '#66BB6A',
                    },
                },
                containedSecondary: {
                    backgroundColor: '#FFB74D',
                    '&:hover': {
                        backgroundColor: '#FFA726',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#424242',

                    boxShadow: '0 2px 4px rgba(255, 255, 255, 0.1)',
                },
            },
        },
    },
    typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            color: '#81C784',
        },
        h2: {
            fontWeight: 600,
            color: '#81C784',
        },
        body1: {
            color: '#FFFFFF',
        },
        body2: {
            color: '#BDBDBD',
        },
        button: {
            fontWeight: 600,
        },
    },
});

export default darkTheme;
