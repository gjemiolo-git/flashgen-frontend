import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, AlertTitle, Snackbar, useMediaQuery } from '@mui/material';
import { clearMessage } from '../../redux/slices/authSlice';
import { styled, useTheme } from '@mui/material/styles';


const Notifications = () => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.auth.message);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (!message) return null;
    const { success, info, error, warning } = message;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearMessage());
    };

    const StyledAlert = styled(Alert)(({ theme }) => ({
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            minWidth: '300px',
            maxWidth: '600px',
        },
    }));

    const renderAlert = () => {
        if (success) {
            return <StyledAlert onClose={handleClose} severity="success">
                <AlertTitle>Success</AlertTitle>
                {success}
            </StyledAlert>;
        }
        if (error) {
            return <StyledAlert onClose={handleClose} severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
            </StyledAlert>;
        }
        if (info) {
            return <StyledAlert onClose={handleClose} severity="info">
                <AlertTitle>Info</AlertTitle>
                {info}
            </StyledAlert>;
        }
        if (warning) {
            return <StyledAlert onClose={handleClose} severity="warning">
                <AlertTitle>Warning</AlertTitle>
                {warning}
            </StyledAlert>;
        }
        return null;
    };

    const isOpen = Boolean(success || info || error || warning);

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={isOpen}
            autoHideDuration={4000}
            onClose={handleClose}
            sx={{
                width: isMobile ? '100%' : 'auto',
                '& .MuiSnackbarContent-root': {
                    width: '100%',
                },
            }}
        >
            {renderAlert()}
        </Snackbar>
    );
};

export default Notifications;