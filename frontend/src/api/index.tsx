import axios from 'axios';

export const api = axios.create();

// api.interceptors.request.use(
//    function (config) {
//     config.params = {
//         fullName: "Susy Black", password: "susAn2"
//       };
//         return config;
//     }
// );
api.interceptors.request.use(
    // function (config) {
    //     config.data = {
    //         fullName: "Susy Black",
    //         dob: "12.12.2000",
    //         email: "susy@mail.ru",
    //         password: 'susAn2'
    //     };
    //     config.headers = {
    //     'accept': '*/*',
    //     'accept-encoding': 'gzip, deflate, br',
    //     'connection': 'keep-alive',
    //     'content-type': 'application/x-www-form-urlencoded',
    //     'content-length': '73'};
    //     // config.headers = {'content-type': 'text/charset=utf-8'};
    //      return config;
    //  }
    // (config) => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         return config;
    //     }
    //     config.headers['x-access-token'] = token;
    //     return config;
    // }
 );

api.interceptors.response.use(
    (response) => {
        return response.data;
    }
);

// export default axios;
