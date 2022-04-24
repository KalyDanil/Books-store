import axios from 'axios';

export const api = axios.create();

api.interceptors.request.use(
 );

api.interceptors.response.use(
    (response) => {
        return response.data;
    }
);