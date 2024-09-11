// src/axiosInstance.js
import axios from 'axios';

// Create an Axios instance with a default base URL
const axiosInstance = axios.create({
    baseURL: 'http://localhost/', 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },// Replace with your Laravel backend URL
    // You can also add headers if needed
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

export default axiosInstance;
