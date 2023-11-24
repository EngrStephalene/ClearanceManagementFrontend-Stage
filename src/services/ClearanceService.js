import axios from "axios";
import { getToken } from "./AuthService";

const CLEARANCE_REST_API_BASE_URL = 'amiable-copper-production.up.railway.app/api/clearance/';


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    return Promise.reject(error);
});

export const getAllClearanceRequest = () => axios.get(CLEARANCE_REST_API_BASE_URL)

export const getClearanceByStudentId = (studentId) => axios.get(CLEARANCE_REST_API_BASE_URL + studentId)

export const markClearanceAsApprove = (id) => axios.patch(CLEARANCE_REST_API_BASE_URL + id)

export const markClearanceAsReject = (id, remarks) => axios.patch('amiable-copper-production.up.railway.app/api/clearance/reject/' + id, remarks)

export const addClearance = (clearance) => axios.post('amiable-copper-production.up.railway.appamiable-copper-production.up.railway.app/api/clearance/add' , clearance)

export const deleteStudentClearance = (studentId) => axios.delete(CLEARANCE_REST_API_BASE_URL + studentId)