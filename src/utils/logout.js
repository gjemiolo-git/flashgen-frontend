import { clearUser, setMessage } from '../redux/slices/authSlice';
import { onLogout } from '../api/all';

export const logoutUser = async (dispatch, navigate, isAuthenticated) => {
    if (!isAuthenticated) {
        console.log('Not auth')
        dispatch(setMessage({ warning: 'You are not logged in' }));
        navigate('/login');
        return;
    }
    try {
        await onLogout();
        dispatch(clearUser());
        navigate('/login');
    } catch (error) {
        console.error('Logout failed', error);
    }

};
