import axios, {AxiosError} from 'axios';
import Qs from 'qs';
import {UserLoginPageRoute} from '^pages/users/login';
import {UserSignUpPageRoute} from '^pages/users/signup';
import {toast} from 'react-toastify';
import {ProductListPageRoute} from '^pages/products';
import {ProductDetailPageRoute} from '^pages/products/[id]';
import {PostListPageRoute} from '^pages/posts';
import {PostDetailPageRoute} from '^pages/posts/[id]';

export const SIGNED_TOKEN_STORAGE_KEY = 'token';
export const getToken = () => typeof window !== 'undefined' && localStorage.getItem(SIGNED_TOKEN_STORAGE_KEY);
export const setToken = (token: string) => localStorage.setItem(SIGNED_TOKEN_STORAGE_KEY, token);
export const removeToken = () => localStorage.removeItem(SIGNED_TOKEN_STORAGE_KEY);

export type ApiErrorDto = {
    code: string;
    message: string;
    status: number;
};

export class ApiError<T = ApiErrorDto, D = any> extends AxiosError<T, D> {}

export function errorToast(e: ApiError) {
    if (e.response) {
        const message = e.response.data.message as string | string[];
        if (message instanceof Array) {
            message.forEach((msg) => toast.error(msg));
        } else {
            toast.error(message);
        }
    }
}

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
});

/**
 * Request Middleware
 */

const IgnoreSignCheckPagePathList = () => [
    UserLoginPageRoute.pathname,
    UserSignUpPageRoute.pathname,
    ProductListPageRoute.pathname,
    ProductDetailPageRoute.pathname,
    PostListPageRoute.pathname,
    PostDetailPageRoute.pathname,
];

api.interceptors.request.use((config) => {
    // Middleware 1. Token Header Handler
    const token = getToken();
    if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers!.Authorization;
    }

    // Middleware 2. Format nested params correctly
    config.paramsSerializer = (params) =>
        Qs.stringify(params, {
            arrayFormat: 'brackets',
            encode: false,
        });

    return config;
});

api.interceptors.response.use(undefined, (error: AxiosError<ApiErrorDto>) => {
    // console.log(window.location.pathname);

    const {response} = error;
    if (!response || !response.data) {
        toast.error('네트워크 연결 상태를 확인해주세요');
        return Promise.reject(error);
    }

    if (
        !IgnoreSignCheckPagePathList().includes(window.location.pathname) &&
        response.status === 401 &&
        String(response.statusText) === 'Unauthorized'
    ) {
        // updateToken()
        //     .then(() => window.location.reload())
        //     .catch(() => {
        //         tokenState.reset();
        //         window.location.assign('/admin/login');
        //     });
        alert('[401] Login required.');
        typeof window !== 'undefined' && window.location.assign(UserLoginPageRoute.path());
    }
    // toast.error(error.response.data.message.toString());
    console.log(response?.data?.message?.toString());
    return Promise.reject(error);
});
