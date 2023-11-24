import ListViolationsComponent from './components/Violation/ListViolationsComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ListDepartmentComponent from './components/Department/ListDepartmentComponent'
import DepartmentComponent from './components/Department/DepartmentComponent'
import ListSubjectComponent from './components/Subject/ListSubjectComponent'
import SubjectComponent from './components/Subject/SubjectComponent'
import LoginComponent from './components/LoginComponent'
import ListStudentsComponent from './components/Student/ListStudentsComponent'
import StudentComponent from './components/Student/StudentComponent'
import ListFacultyComponent from './components/Faculty/ListFacultyComponent'
import { isUserLoggedIn } from './services/AuthService'
import FacultyComponent from './components/Faculty/FacultyComponent'
import ListClearanceComponent from './components/Clearance/ListClearanceComponent'
import SideBarComponent from './components/SideBarComponent'
import ProfileComponent from './components/Profile/ProfileComponent'
import ListAnnouncementComponent from './components/Announcement/ListAnnouncementComponent'
import './App.css'
import ListViolationForStudentComponent from './components/Violation/ListViolationForStudentComponent'

function App() {

  const isAuthenticated = isUserLoggedIn()

  function AuthenticatedRoute({children}) {
    if(isAuthenticated) {
      return children
    }
    return <Navigate to="https://clearance-management-frontend-stage.vercel.app/" />
  }

  return (
    <div className='App'>
      <BrowserRouter>
      <HeaderComponent/>
      <SideBarComponent>
          <Routes>
            {/* Routing for Violation Service */}
            <Route path='https://clearance-management-frontend-stage.vercel.app/violations' element = {
              <AuthenticatedRoute>
                <ListViolationsComponent/>
              </AuthenticatedRoute>
              }>
            </Route>
            <Route path='https://clearance-management-frontend-stage.vercel.app/student-violations' element = {
              <AuthenticatedRoute>
                <ListViolationForStudentComponent/>
              </AuthenticatedRoute>
            }>
            </Route>

            {/* Routing for Department Service */}
            <Route path='https://clearance-management-frontend-stage.vercel.app/departments' element = {
              <AuthenticatedRoute>
                <ListDepartmentComponent/>
              </AuthenticatedRoute>
            }></Route>
            <Route path='https://clearance-management-frontend-stage.vercel.app/add-department' element = {
              <AuthenticatedRoute>
                <DepartmentComponent/>
              </AuthenticatedRoute>
            }></Route>
            <Route path='https://clearance-management-frontend-stage.vercel.app/update-department/:id' element = {
              <AuthenticatedRoute>
                <DepartmentComponent/>
              </AuthenticatedRoute>
            }></Route>

            {/* Routing for Subject Service */}
            <Route path='https://clearance-management-frontend-stage.vercel.app/subjects' element = {
              <AuthenticatedRoute>
                <ListSubjectComponent/>
              </AuthenticatedRoute>
            }></Route>
            <Route path='https://clearance-management-frontend-stage.vercel.app/add-subject' element= {
              <AuthenticatedRoute>
                <SubjectComponent/>
              </AuthenticatedRoute>
            }></Route>
            <Route path='https://clearance-management-frontend-stage.vercel.app/update-subject/:id' element = {
              <AuthenticatedRoute>
                <SubjectComponent/>
              </AuthenticatedRoute>
            }></Route>

            {/* Routing for Students Service */}
            <Route path='https://clearance-management-frontend-stage.vercel.app/students' element = {
              <AuthenticatedRoute>
                <ListStudentsComponent/>
              </AuthenticatedRoute>
            }></Route>
            <Route path="https://clearance-management-frontend-stage.vercel.app/add-student" element = {
              <AuthenticatedRoute>
                <StudentComponent/>
              </AuthenticatedRoute>
            }></Route>

            {/* Routing for Faculty Service */}
            <Route path='https://clearance-management-frontend-stage.vercel.app/faculties' element = {
              <AuthenticatedRoute>
                <ListFacultyComponent/>
              </AuthenticatedRoute>
            }></Route>
            <Route path='https://clearance-management-frontend-stage.vercel.app/add-faculty' element = {
              <AuthenticatedRoute>
                <FacultyComponent/>
              </AuthenticatedRoute>
            }></Route>

            {/* Routing for Clearance Service */}
            <Route path='https://clearance-management-frontend-stage.vercel.app/clearances' element = {
              <AuthenticatedRoute>
                <ListClearanceComponent/>
              </AuthenticatedRoute>
            }></Route>

            {/* Routing for Authentication (LOGIN) and Dashboard*/}
            <Route path='https://clearance-management-frontend-stage.vercel.app/' element = {<LoginComponent/>}></Route>

            {/* Routing for Dashboard component */}
            <Route path='https://clearance-management-frontend-stage.vercel.app/home' element = {
              <AuthenticatedRoute>
                <ListAnnouncementComponent/>
              </AuthenticatedRoute>
            }></Route>

            {/* Route for Profile Section */}
            <Route path='https://clearance-management-frontend-stage.vercel.app/profile' element = {
              <AuthenticatedRoute>
                <ProfileComponent/>
              </AuthenticatedRoute>
            }>
            </Route>
          </Routes>
        </SideBarComponent>
        {/* <FooterComponent/> */}
      </BrowserRouter>
    </div>
  )
}

export default App