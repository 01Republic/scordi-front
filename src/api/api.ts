import axios from 'axios';

const token = localStorage.getItem('token');

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
});

api.interceptors.request.use((config) => {
    if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers!.Authorization;
    }
    return config;
});

api.interceptors.response.use(undefined, (error) => {
    if (error.response.status === 401) {
        // updateToken()
        //     .then(() => window.location.reload())
        //     .catch(() => {
        //         tokenState.reset();
        //         window.location.assign('/admin/login');
        //     });
        window.location.assign('/login');
    }
    // toast.error(error.response.data.message.toString());
    console.log(error.response.data.message.toString());
    return Promise.reject(error);
});
