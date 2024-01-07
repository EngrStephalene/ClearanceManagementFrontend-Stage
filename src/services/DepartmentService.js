import axios from "axios";
import { getToken } from "./AuthService";

const DEPARTMENT_REST_API_BASE_URL = 'https://amiable-copper-production.up.railway.app/api/department/';


// Add a request interceptor
  axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    return Promise.reject(error);
  });


export const getAllDepartment = () => axios.get(DEPARTMENT_REST_API_BASE_URL)

export const getDepartmentById = (id) => axios.get(DEPARTMENT_REST_API_BASE_URL + '/' + id)

export const addDepartment = (department) => axios.post(DEPARTMENT_REST_API_BASE_URL + 'add' , department)

export const editDepartment = (department) => axios.put(DEPARTMENT_REST_API_BASE_URL + 'update', department)

export const deleteDepartment = (id) => axios.delete(DEPARTMENT_REST_API_BASE_URL + id)