import axios from 'axios';
axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
    return await axios.post(
        `{REACT_APP_BACKEND_IP}:{REACT_APP_BACKEND_PORT}/api/register`,
        registrationData
    )
}

export async function onLogin(loginData) {
    return await axios.post(
        `{REACT_APP_BACKEND_IP}:{REACT_APP_BACKEND_PORT}/api/register`,
        loginData
    )
}

export async function onLogout() {
    return await axios.get(`{REACT_APP_BACKEND_IP}:{REACT_APP_BACKEND_PORT}/api/logout`);
}

export async function fetchProtectedInfo() {
    return await axios.get(`{REACT_APP_BACKEND_IP}:{REACT_APP_BACKEND_PORT}/api/protected`);
}