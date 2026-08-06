import axios from 'axios';
import Cookies from 'js-cookie';
import { internalApiUrl } from '@/config';

const api = axios.create({
    baseURL: internalApiUrl,
    headers: {
        "Accept": "application/json",
    }
});

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                handleUnauthorized();
            } else if (status === 403) {
                handleForbidden();
            } else {
                return Promise.reject(error);
            }
        } else {
            return Promise.reject(error);
        }
    }
);

function handleUnauthorized() {
    Cookies.remove('token');
    Cookies.remove('user');
    if (typeof window !== 'undefined') {
        window.location.href = '/';
    }
}

function handleForbidden() {
    if (typeof window !== 'undefined') {
        window.location.href = '/forbidden';
    }
}

export default api;