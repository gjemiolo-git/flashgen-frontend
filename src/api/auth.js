import axios from 'axios';
axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
    return await axios.post(
        `${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api/auth/register`,
        registrationData
    )
}

export async function onLogin(loginData) {
    return await axios.post(
        `${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api/auth/login`,
        loginData
    )
}

export async function onLogout() {
    return await axios.post(`${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api/auth/logout`);
}

export async function fetchProtectedInfo(page = 1, limit = 5) {
    return await axios.get(`${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api/ai/dashboard/flashcard-sets`, {
        params: {
            page: page,
            limit: limit
        }
    });
}

