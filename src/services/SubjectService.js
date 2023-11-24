import axios from "axios";
import { getToken } from "./AuthService";

const SUBJECT_REST_API_BASE_URL = 'https://amiable-copper-production.up.railway.app/api/subject/';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export const getAllSubject = () => axios.get(SUBJECT_REST_API_BASE_URL)

export const updateSubject = (subject,id) => axios.put(SUBJECT_REST_API_BASE_URL + id, subject)

export const deleteSubject = (id) => axios.delete(SUBJECT_REST_API_BASE_URL + id)