import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography, Button, Container, Paper, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { emailValidation, passwordValidation } from '../utils/validations';
import EmailField from '../components/input/EmailField';
import PasswordField from '../components/input/PasswordField';

function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setError, setValue } = useForm();
    const passwordRef = useRef(null);

    const onSubmit = async (data) => {
        try {
            console.log('Login data:', data);

            navigate('/dashboard');
        } catch (error) {
            setError('password', {
                type: 'manual',
                message: 'Invalid email or password'
            });
            setValue('password', '');
            if (passwordRef.current) {
                passwordRef.current.focus();
            }
        }
    };

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
                            ref={passwordRef}
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
