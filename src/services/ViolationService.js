import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'https://amiable-copper-production.up.railway.app/api/violation/';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export function getAllViolation() {
    return axios.get(BASE_REST_API_URL);
}

export const getStudentViolations = (studentId) => axios.get('https://amiable-copper-production.up.railway.app/api/violation/get/' + studentId)

export const getStudentViolationByStudentNumber = (studentNumber) => axios.get('https://amiable-copper-production.up.railway.app/api/violation/student-violation/' + studentNumber)

export function createViolation(studentNumber, violation) {
    axios.post('https://amiable-copper-production.up.railway.app/api/violation/add/' + studentNumber , violation);
}

export const deleteViolation = (id) => axios.delete(BASE_REST_API_URL + id)

export const markViolationAsComplete = (id) => axios.patch('https://amiable-copper-production.up.railway.app/api/violation/complete/' + id)

export const updateViolation = (id, violation) => axios.put(BASE_REST_API_URL + id, violation)