import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    message: {
        success: null,
        error: null,
        warning: null,
        info: null
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = { ...action.payload };
        },
        clearUser: (state) => {
            state.user = null;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        clearMessage: (state) => {
            state.message = {};
        },
    }
})

export const { setUser, clearUser, setError, setMessage, clearMessage } = authSlice.actions
export default authSlice.reducer;