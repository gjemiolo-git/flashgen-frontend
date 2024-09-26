// src/utils/validations.js

export const emailValidation = {
    required: "Email is required",
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address"
    }
};

export const passwordValidation = {
    required: "Password is required",
    minLength: {
        value: 8,
        message: "Password must be at least 8 characters long"
    }
};

export const usernameValidation = {
    required: "Username is required",
    minLength: {
        value: 3,
        message: "Username must be at least 3 characters long"
    }
};
