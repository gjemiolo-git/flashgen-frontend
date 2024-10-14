import axios from 'axios';
axios.defaults.withCredentials = true;

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` :
    `${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}/api`;

const apiWrapper = async (apiCall) => {
    try {
        const response = await apiCall();
        return response.data;
    } catch (error) {
        console.error('API call failed:', error.message);
        if (error.response) {
            console.error('Error data:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};


// Auth
export const onRegistration = (registrationData) =>
    apiWrapper(() => axios.post(`${API_BASE_URL}/auth/register`, registrationData));

export const onLogin = (loginData) =>
    apiWrapper(() => axios.post(`${API_BASE_URL}/auth/login`, loginData));

export const onLogout = () =>
    apiWrapper(() => axios.post(`${API_BASE_URL}/auth/logout`));

// Flashcard Sets

export const flashcardSetCreate = (data) =>
    apiWrapper(() => axios.post(`${API_BASE_URL}/ai/flashcard-sets`, { payload: data }));

export const updateSet = (sId, data) =>
    apiWrapper(() => axios.put(`${API_BASE_URL}/ai/flashcard-sets/${sId}/update`, { payload: data }));

export const fetchProtectedInfo = (page = 1, limit = 5) =>
    apiWrapper(() => axios.get(`${API_BASE_URL}/ai/dashboard/flashcard-sets`, { params: { page, limit } }));

export const getStudyView = (sId) =>
    apiWrapper(() => axios.get(`${API_BASE_URL}/ai/flashcard-sets/${sId}`));

export const deleteSet = (sId) =>
    apiWrapper(() => axios.delete(`${API_BASE_URL}/ai/flashcard-sets/${sId}`));

// Topics

export const topicCreate = (topicName) =>
    apiWrapper(() => axios.post(`${API_BASE_URL}/ai/topics`, { name: topicName }));

export const deleteTopic = (tId) =>
    apiWrapper(() => axios.delete(`${API_BASE_URL}/ai/topics/${tId}`));

export const getTopicList = (page = 1, limit = 15) =>
    apiWrapper(() => axios.get(`${API_BASE_URL}/ai/topics`, { params: { page, limit } }));

export const getTopicDashboard = (id, page = 1, limit = 15) =>
    apiWrapper(() => axios.get(`${API_BASE_URL}/ai/topics-dashboard/${id}`, { params: { page, limit } }));


// AI Flashcards
export const fetchNewFlashcards = (data) =>
    apiWrapper(() => axios.post(`${API_BASE_URL}/ai/flashcards`, data));
