import axios from 'axios';

export const api = axios.create();

api.interceptors.request.use(
    (config) => {
        config.headers ={
            'Authorization': `token ${localStorage.getItem('token')}`
        };
        config.baseURL ='http://localhost:4000/';
        return config;
    }
 );

api.interceptors.response.use(
    (response) => {
        return response.data;
    }
);