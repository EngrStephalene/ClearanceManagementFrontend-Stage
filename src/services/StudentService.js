import axios from "axios";
import { getToken } from "./AuthService";

const STUDENT_REST_API_BASE_URL = 'https://amiable-copper-production.up.railway.app/api/student/';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export const getAllStudent = () => axios.get(STUDENT_REST_API_BASE_URL)

export const getStudentInformation = (userId) => axios.get('https://amiable-copper-production.up.railway.app/api/student/' + userId)

export const addStudent = (student) => axios.post(STUDENT_REST_API_BASE_URL + 'add' , student)

export const updateStudent = (request) => axios.put(STUDENT_REST_API_BASE_URL + 'update', request)

export const getStudentNumberByUserId = (userId) => axios.get(STUDENT_REST_API_BASE_URL + 'get-studentNumber/' + userId)

export const getStudentNameByUserId = (userId) => axios.get(STUDENT_REST_API_BASE_URL + "get-studentName/" + userId)

export const deleteStudent = (id) => axios.delete(STUDENT_REST_API_BASE_URL + 'delete/' + id)

export const addAllStudents = (students) => axios.post(STUDENT_REST_API_BASE_URL + 'add-students', students)