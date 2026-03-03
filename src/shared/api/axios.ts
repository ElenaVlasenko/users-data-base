import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '@shared/config/api';

type ApiClient = {
    client: AxiosInstance;
    setAuthToken: (token: string | null) => void;
}

export const createApiClient = (): ApiClient => {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 15000
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            const message = error?.response?.data?.message ?? error.message;
            return Promise.reject(new Error(message));
        }
    );

    const setAuthToken = (token: string | null) => {
        if (token) {
            instance.defaults.headers.common.Authorization = `Bearer ${token}`;
        } else {
            delete instance.defaults.headers.common.Authorization;
        }
    };

    return {
        client: instance,
        setAuthToken
    };
}