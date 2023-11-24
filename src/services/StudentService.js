import axios from "axios";
import { getToken } from "./AuthService";

const STUDENT_REST_API_BASE_URL = 'http://localhost:8080/api/student/';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export const getAllStudent = () => axios.get(STUDENT_REST_API_BASE_URL)

export const getStudentInformation = (userId) => axios.get('http://localhost:8080/api/student/' + userId)

export const addStudent = (student) => axios.post('http://localhost:8080/api/student/add' , student)