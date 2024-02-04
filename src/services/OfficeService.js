import axios from "axios";
import { getToken } from "./AuthService";

const OFFICE_REST_API_BASE_URL = 'https://amiable-copper-production.up.railway.app/api/offices/';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export const getAllOffice = () => axios.get(OFFICE_REST_API_BASE_URL)
export const addOffice = (request) => axios.post(OFFICE_REST_API_BASE_URL + 'add', request)
export const updateOfficeName = (request) => axios.patch(OFFICE_REST_API_BASE_URL + 'update-name', request)
export const updateOfficeAssignment = (request) => axios.patch(OFFICE_REST_API_BASE_URL + 'update-assignment', request);
export const deleteOffice = (id) => axios.delete(OFFICE_REST_API_BASE_URL + id)