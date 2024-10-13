import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

function UsernameField({ register, errors, validation }) {
  return (
    <TextField
      margin="normal"
      fullWidth
      id="username"
      label="Username"
      autoComplete="username"
      {...register("username", validation)}
      error={!!errors.username}
      helperText={errors.username?.message}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default UsernameField;
