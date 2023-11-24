import React from 'react'
import { isUserLoggedIn, logout } from '../services/AuthService'
import { NavLink, useNavigate } from 'react-router-dom'

const HeaderComponent = () => {
  const isAuth = isUserLoggedIn()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
    window.location.reload(true);
  }
  return (
    <div>
        <header>
            <nav className="navbar navbar-light" id='headerNav'>
              <div className="container-fluid">
                <a className="navbar-brand" href='http://localhost:3000/home'>SAINT FRANCIS COLLEGE - GUIHULNGAN</a>
                <ul className='navbar-nav'>
                  {
                    isAuth && 
                    <li className='nav-item'>
                      <NavLink className='nav-link' onClick={handleLogout}>Logout.</NavLink>
                    </li>
                  }
                </ul>
              </div>
            {/* <a className="navbar-brand" href='http://localhost:3000/departments'>View Departments</a>
            <a className="navbar-brand" href='http://localhost:3000/subjects'>View Subjects</a>
            <a className="navbar-brand" href='http://localhost:3000/students'>View Students</a>
            <a className="navbar-brand" href='http://localhost:3000/faculties'>View Faculties</a>
            <a className="navbar-brand" href='http://localhost:3000/violations'>View Violations</a> */}
            {/* {
              isAuth && <a className="navbar-brand" onClick={handleLogout}>Logout</a>
            } */}
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent