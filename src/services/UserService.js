import axios from "axios";
import { getToken } from "./AuthService";

const USER_REST_API_BASE_URL = 'https://amiable-copper-production.up.railway.app/api/user/';


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    return Promise.reject(error);
});

export const getRoleOfFaculty = (id) => axios.get(USER_REST_API_BASE_URL + 'role/' + id)

export const verifyPassword = (username, password) => axios.post(USER_REST_API_BASE_URL, {username, password})

export const updateUserProfile = (request) => axios.put(USER_REST_API_BASE_URL + 'update', request);

export const updatePassword = (username, password, newPassword) => axios.patch(USER_REST_API_BASE_URL + "update-password", {username,password,newPassword})