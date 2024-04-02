import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BACKEND,
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
    window.location.href = '/';
}

function handleForbidden() {
    window.location.href = '/forbidden';
}

export default api;