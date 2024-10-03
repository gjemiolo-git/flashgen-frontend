import { createSlice, configureStore } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false
    },
    reducers: {
        authenticateUser: (state) => {
            state.isAuth = true;
        },
        unAuthenticateUser: (state) => {
            state.isAuth = false;
        }


    }
})

export const { authenticateUser, unAuthenticateUser } = authSlice.actions