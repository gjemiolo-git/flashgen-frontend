import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { clearMessage } from '../../redux/slices/authSlice';
import { styled } from '@mui/material/styles';
import ErrorBoundary from '../pages/ErrorBoundary';

const Notifications = () => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.auth.message);
    if (!message) return null;
    const { success, info, error, warning } = message;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearMessage());
    };

    const StyledAlert = styled(Alert)(() => ({
        width: '100%'
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
        <ErrorBoundary>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center', }} sx={{ width: '33%' }}
                open={isOpen} autoHideDuration={4000} onClose={handleClose}>
                {renderAlert()}
            </Snackbar>
        </ErrorBoundary>
    );
};

export default Notifications;
