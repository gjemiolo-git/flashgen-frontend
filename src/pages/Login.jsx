import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography, Button, Container, Paper, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { emailValidation, passwordValidation } from '../utils/validations';
import EmailField from '../components/input/EmailField';
import PasswordField from '../components/input/PasswordField';
import { setMessage, setUser } from '../redux/slices/authSlice';
import { onLogin } from '../api/auth';

function Login() {
    const { register, setFocus, handleSubmit, clearErrors, formState: { errors }, setError } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (payload) => {
        try {
            const { data } = await onLogin(payload);
            const { user } = data;
            dispatch(setUser(user));
            dispatch(setMessage({ success: data.message }));
            navigate('/dashboard');
        } catch (e) {
            if (e.response && e.response.data && Array.isArray(e.response.data.errors)) {
                const allErrors = e.response.data.errors;
                console.log(allErrors);
                dispatch(setMessage({ error: allErrors[0].msg }));
                const fieldErrors = ['email', 'password'];
                fieldErrors.forEach(field => {
                    const errors = allErrors.filter(error => error.path === field);
                    if (errors.length > 0) {
                        setError(field, {
                            type: 'manual',
                            message: errors.map(error => error.msg).join('. ')
                        });
                        setFocus(field)
                    } else {
                        clearErrors(field);
                    }
                });
            }
        };
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <EmailField
                            register={register}
                            errors={errors}
                            validation={emailValidation}
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
                            Sign In
                        </Button>
                        <Box sx={{ textAlign: 'center' }}>
                            <Link component={RouterLink} to="/forgot-password" variant="body2">
                                Forgot password?
                            </Link>
                        </Box>
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Typography variant="body2">
                                Don't have an account?{' '}
                                <Link component={RouterLink} to="/register">
                                    Sign Up
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;
