import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { emailValidation, passwordValidation, usernameValidation } from '../utils/validations';
import UsernameField from '../components/input/UsernameField';
import EmailField from '../components/input/EmailField';
import PasswordField from '../components/input/PasswordField';

function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log('Registration data:', data);
        navigate('/register-success');
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
