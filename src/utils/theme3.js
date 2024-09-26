import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#673AB7', // Deep Purple
            light: '#9A67EA',
            dark: '#320B86',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#FFD700', // Gold
            light: '#FFF350',
            dark: '#C7A600',
            contrastText: '#000000',
        },
        background: {
            default: '#FFFFFF',
            paper: '#F8F8F8',
        },
        text: {
            primary: '#333333',
            secondary: '#757575',
        },
    },
    // palette: {
    //     primary: {
    //         main: '#FFA500', // Orange
    //         light: '#FFD700', // Gold
    //         dark: '#FF8C00', // Dark Orange
    //         contrastText: '#000000',
    //     },
    //     secondary: {
    //         main: '#FFD700', // Gold
    //         light: '#FFFACD', // Lemon Chiffon
    //         dark: '#DAA520', // Goldenrod
    //         contrastText: '#000000',
    //     },
    //     background: {
    //         default: '#FFFAF0', // Floral White
    //         paper: '#FFEFD5', // Papaya Whip
    //     },
    //     text: {
    //         primary: '#000000',
    //         secondary: '#8B4513', // Saddle Brown
    //     },
    // },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFA500', // Orange
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#FFD700', // Gold
                    },
                },
                containedPrimary: {
                    backgroundColor: '#FFA500', // Orange
                    '&:hover': {
                        backgroundColor: '#FF8C00', // Dark Orange
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFEFD5', // Papaya Whip
                },
            },
        },
    },
});

export default theme;
