import axios from "axios";

const authApiClient = axios.create({
    
    baseURL: 'https://amiable-copper-production.up.railway.app/api/auth'
})
  

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const loginAPICall = (username, password) => authApiClient.post('/login', { username, password })

export const saveLoggedUser = (username, role, userId) => {
    sessionStorage.setItem("authenticatedUser", username)
    sessionStorage.setItem("role", role)
    sessionStorage.setItem("userId",userId)
}

export const isUserLoggedIn = () => {

    const username = sessionStorage.getItem("authenticatedUser")

    if (username == null) {
        return false
    } else {
        return true
    }
}

export const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser")
    return username
}

export const getUserId = () => {
    const userId =  sessionStorage.getItem("userId")
    return userId
}

export const getRole = () => {
    const role = sessionStorage.getItem("role")
    return role
}

export const logout = () => {
    localStorage.clear()
    sessionStorage.clear()
}

export const isAdminUser = () => {
    let role = sessionStorage.getItem("role")
    if(role != null && role === 'ROLE_ADMIN') return true
    else return false
}

export const isFacultyUser = () => {
    let role = sessionStorage.getItem("role")
    if(role != null && role === 'ROLE_FACULTY') return true
    else return false
}

export const isStudentUser = () => {
    let role = sessionStorage.getItem("role")
    if(role != null && role === 'ROLE_STUDENT') return true
    else return false
}

export const isFacultyHead = () => {
    let role = sessionStorage.getItem("role")
    if(role != null && role === 'ROLE_FACULTY_HEAD' || role === 'ROLE_TREASURER'
    || role === 'ROLE_CHAIRMAN' || role === 'ROLE_SG_ADVISER'
    || role === 'ROLE_CAMPUS_MINISTRY' || role === 'ROLE_GUIDANCE_OFFICE'
    || role === 'ROLE_LIBRARIAN' || role === 'ROLE_DISPENSARY'
    || role === 'ROLE_PROPERTY_CUSTODIAN' || role === 'ROLE_PREFECT_DISCIPLINE'
    || role === 'ROLE_REGISTRAR' || role === 'ROLE_FINANCE') return true
    else return false
}

export const isPrefectOfDiscipline = () => {
    let role = sessionStorage.getItem("role")
    if(role != null && role === 'ROLE_PREFECT_DISCIPLINE') return true
    else return false
}