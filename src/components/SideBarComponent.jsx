import React, { useState } from 'react'
import '../App.css'
import Face4Icon from '@mui/icons-material/Face4';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Face3Icon from '@mui/icons-material/Face3';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser, isAdminUser, isFacultyHead, isStudentUser, isUserLoggedIn } from '../services/AuthService';
import { Avatar } from '@mui/material';

const SideBarComponent = ({children}) => {

  const authUser = getLoggedInUser();

  const isAuth = isUserLoggedIn();
  const navigate = useNavigate();
  const isAdmin = isAdminUser();
  const isFacultyH = isFacultyHead();
  const isStudent = isStudentUser();

  //THIS FUNCTION IS FOR HOME ROUTE
  function handleHomeLink() {
    navigate('/home')
    window.location.reload(true)
  }

  //THIS FUNCTION IS FOR PROFILE ROUTE
  function handleProfileLink() {
    navigate('/profile')
    window.location.reload(true)
  }

  //THIS FUNCTION IS FOR CLEARANCE ROUTE
  function handleClearanceLink() {
    //ADD CONDITION HERE BASED ON USER ROLE
    navigate('clearances')
    window.location.reload(true)
  }

  //THIS FUNCTION IS FOR DEPARTMENTS ROUTE
  function handleDepartmentLink() {
    navigate('/departments')
    window.location.reload(true)
  }

  //THIS FUNCTION IS FOR SUBJECTS ROUTE
  function handleSubjectLink() {
    navigate('/subjects')
    window.location.reload(true)
  }

  //THIS FUNCTION IS FOR STUDENTS ROUTE
  function handleStudentLink() {
    navigate('/students')
    window.location.reload(true)
  }

  //THIS FUNCTION IS FOR FACULTIES ROUTE
  function handleFacultyLink() {
    navigate('/faculties')
    window.location.reload(true)
  }

  //THIS FUNCTION IS FOR VIOLATIONS ROUTE
  function handleViolationLink() {
    navigate('/violations')
    window.location.reload(true)
  }

  function handleStudentViolationLink() {
    navigate('/student-violations')
    window.location.reload(true)
  }

  return (
    <div className='MainComponent'>
      {
        isAuth &&
        <div className='Sidebar'>
          <ul className='SidebarList'>
              <li
              className='SidebarRow'
              >
                <div id='avatarIcon'>
                  <Avatar>A</Avatar>
                </div>
              </li>
              <li
              className='SidebarRow'
              >
                <div id='avatarIcon'>
                  <p>Welcome back</p>
                  <p>{authUser}</p>
                </div>
              </li>
              <li 
                className='SidebarRow' 
                onClick={handleHomeLink}
                id={window.location.pathname == "/home" ? "active" : ""}
                >
                  <div id='sidebarIcon'>
                    {
                      <HomeIcon/>
                    }
                  </div>
                  <div id='sidebarTitle'>HOME</div>
              </li>
              <li 
                className='SidebarRow' 
                onClick={handleProfileLink}
                id={window.location.pathname == "/profile" ? "active" : ""}
                >
                  <div id='sidebarIcon'>
                    {
                      <PersonIcon/>
                    }
                  </div>
                  <div id='sidebarTitle'>PROFILE</div>
              </li>
              <li 
                className='SidebarRow' 
                onClick={handleClearanceLink}
                id={window.location.pathname == "/clearances" ? "active" : ""}
                >
                  <div id='sidebarIcon'>
                    {
                      <AssignmentIcon/>
                    }
                  </div>
                  <div id='sidebarTitle'>CLEARANCE</div>
              </li>
              <li 
                className='SidebarRow' 
                onClick={handleDepartmentLink}
                id={window.location.pathname == "/departments" ? "active" : ""}
                >
                  <div id='sidebarIcon'>
                    {
                      <MeetingRoomIcon/>
                    }
                  </div>
                  <div id='sidebarTitle'>DEPARTMENTS</div>
              </li>
              <li 
                className='SidebarRow' 
                onClick={handleSubjectLink}
                id={window.location.pathname == "/subjects" ? "active" : ""}
                >
                  <div id='sidebarIcon'>
                    {
                      <FormatListNumberedIcon/>
                    }
                  </div>
                  <div id='sidebarTitle'>SUBJECTS</div>
              </li>
              {
                isAdmin && <li 
                className='SidebarRow' 
                onClick={handleStudentLink}
                id={window.location.pathname == "/students" ? "active" : ""}
                >
                  <div id='sidebarIcon'>
                    {
                      <Face4Icon/>
                    }
                  </div>
                  <div id='sidebarTitle'>STUDENTS</div>
              </li>
              }
              {
                isFacultyH && <li 
                className='SidebarRow' 
                onClick={handleStudentLink}
                id={window.location.pathname == "/students" ? "active" : ""}
                >
                  <div id='sidebarIcon'>
                    {
                      <Face4Icon/>
                    }
                  </div>
                  <div id='sidebarTitle'>STUDENTS</div>
              </li>
              }
              {
                isAdmin && 
                <li 
                className='SidebarRow' 
                onClick={handleFacultyLink}
                id={window.location.pathname == "/faculties" ? "active" : ""}
                >
                  <div id='sidebarIcon'>
                    {
                      <Face3Icon/>
                    }
                  </div>
                  <div id='sidebarTitle'>FACULTIES</div>
                </li>
              }
              <li 
                className='SidebarRow' 
                onClick={handleViolationLink}
                id={window.location.pathname == "/violations" ? "active" : ""}
                >
                  <div id='sidebarIcon'>
                    {
                      <ErrorOutlineIcon/>
                    }
                  </div>
                  <div id='sidebarTitle'>VIEW STUDENT VIOLATIONS</div>
              </li>
          </ul>
      </div>
      }
      <main>{children}</main>
    </div>
  )
}

export default SideBarComponent