import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    message: null
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
            clearMessage();
            state.message = action.payload;
        },
        clearMessage: (state) => {
            state.message = null;
        },
    }
})

export const { setUser, clearUser, setError, setMessage, clearMessage } = authSlice.actions
export default authSlice.reducer;