import { useForm } from 'react-hook-form';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { emailValidation, passwordValidation, usernameValidation } from '../utils/validations';
import UsernameField from '../components/input/UsernameField';
import EmailField from '../components/input/EmailField';
import PasswordField from '../components/input/PasswordField';
import { onRegistration } from '../api/auth';
import { setMessage } from '../redux/slices/authSlice';


function Register() {
    const { register, setError, clearErrors, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (payload) => {
        try {
            const { data } = await onRegistration(payload);
            reset();
            dispatch(setMessage({ success: data.message }));
            navigate('/login');
        } catch (e) {
            if (e.response && e.response.data && Array.isArray(e.response.data.errors)) {
                const allErrors = e.response.data.errors;
                dispatch(setMessage({ error: allErrors[0].msg }));
                const fieldErrors = ['email', 'username', 'password'];
                fieldErrors.forEach(field => {
                    const errors = allErrors.filter(error => error.path === field);
                    if (errors.length > 0) {
                        setError(field, {
                            type: 'manual',
                            message: errors.map(error => error.msg).join('. ')
                        });
                    } else {
                        clearErrors(field);
                    }
                });
            } else {
                setError('root.serverError', {
                    type: 'manual',
                    message: e.message || 'An unexpected error occurred'
                });
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <EmailField
                            register={register}
                            errors={errors}
                            validation={emailValidation}
                        />
                        <UsernameField
                            register={register}
                            errors={errors}
                            validation={usernameValidation}
                        />
                        <PasswordField
                            register={register}
                            errors={errors}
                            validation={passwordValidation}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default Register;
