import { clearUser, setMessage } from '../redux/slices/authSlice';
import { onLogout } from '../api/auth';

export const logoutUser = async (dispatch, navigate, isAuthenticated) => {
    if (!isAuthenticated) {
        console.log('Not auth')
        dispatch(setMessage({ warning: 'You are not logged in' }));
        navigate('/login');
        return;
    }
    try {
        console.log('Auth', isAuthenticated)
        await onLogout();
        dispatch(clearUser());
        dispatch(setMessage({ success: 'Successfully logged out' }));
        navigate('/login');
    } catch (error) {
        dispatch(setMessage({ error: 'Logout failed' }));
        console.error('Logout failed', error);
    }

};
