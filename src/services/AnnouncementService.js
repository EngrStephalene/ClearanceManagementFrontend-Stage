import axios from "axios";
import { getToken } from "./AuthService";

const DEPARTMENT_REST_API_BASE_URL = 'https://amiable-copper-production.up.railway.app/api/announcement/';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export const getAllAnnouncement = () => axios.get(DEPARTMENT_REST_API_BASE_URL)

export const addAnnouncement = (announcement) => axios.post(DEPARTMENT_REST_API_BASE_URL + 'add' , announcement)

export const editAnnouncement = (announcement) => axios.put(DEPARTMENT_REST_API_BASE_URL + 'update', announcement)

export const deleteAnnouncement = (id) => axios.delete(DEPARTMENT_REST_API_BASE_URL + id)