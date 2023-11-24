import axios from "axios";
import { getToken } from "./AuthService";

const DEPARTMENT_REST_API_BASE_URL = 'amiable-copper-production.up.railway.app/api/department/';


// Add a request interceptor
  axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    return Promise.reject(error);
  });


export const getAllDepartment = () => axios.get(DEPARTMENT_REST_API_BASE_URL)

export const getDepartmentById = (id) => axios.get(DEPARTMENT_REST_API_BASE_URL + '/' + id)

export function createDepartment(department) {
    axios.post('amiable-copper-production.up.railway.app/api/department/add', department);
}

export function updateDepartment(departmentId, department) {
    axios.put(DEPARTMENT_REST_API_BASE_URL + '/' + departmentId, department);
}

export const deleteDepartment = (id) => axios.delete(DEPARTMENT_REST_API_BASE_URL + id)