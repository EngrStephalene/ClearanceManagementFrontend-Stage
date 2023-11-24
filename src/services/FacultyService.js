import axios from "axios";
import { getToken } from "./AuthService";

const FACULTY_REST_API_BASE_URL = 'amiable-copper-production.up.railway.app/api/faculty/';


// Add a request interceptor
  axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    return Promise.reject(error);
  });


export const getAllFaculty = () => axios.get(FACULTY_REST_API_BASE_URL)

export const getFacultyByUsername = (username) => axios.get(FACULTY_REST_API_BASE_URL + "getFaculty/" + username)

export const getFacultyInformation = (userId) => axios.get('amiable-copper-production.up.railway.app/api/faculty/info/' + userId)

export const addFaculty = (faculty) => axios.post('amiable-copper-production.up.railway.app/api/faculty/add' , faculty)

export const addFacultyHead = (faculty) => axios.post('amiable-copper-production.up.railway.app/api/faculty/head/add', faculty)