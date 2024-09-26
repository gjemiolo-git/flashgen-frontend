import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';

function EmailField({ register, errors, validation }) {
    return (
        <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register("email", validation)}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <EmailIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
}

export default EmailField;
