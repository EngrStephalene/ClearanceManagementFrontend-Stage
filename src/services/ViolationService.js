import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = 'http://localhost:8080/api/violation/';

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

export const getStudentViolations = (studentId) => axios.get('http://localhost:8080/api/violation/get/' + studentId)

export const getStudentViolationByStudentNumber = (studentNumber) => axios.get('http://localhost:8080/api/violation/student-violation/' + studentNumber)

export function createViolation(studentNumber, violation) {
    axios.post('http://localhost:8080/api/violation/add/' + studentNumber , violation);
}

export const deleteViolation = (id) => axios.delete(BASE_REST_API_URL + id)

export const markViolationAsComplete = (id) => axios.patch('http://localhost:8080/api/violation/complete/' + id)

export const updateViolation = (id, violation) => axios.put(BASE_REST_API_URL + id, violation)