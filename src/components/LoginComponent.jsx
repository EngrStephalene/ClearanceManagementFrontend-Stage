import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPICall, storeToken, saveLoggedUser } from "../services/AuthService";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import logoImage from '../images/logo.png';
import { Alert } from "@mui/material";
import './Login.css'

const LoginComponent = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState();

  const navigator = useNavigate();

  

  //FUNCTION FOR /login API
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(username);
        console.log(password);

        await loginAPICall(username,password)
        .then((response) => {
          console.log(response.data);
          // const token = 'Basic ' + window.btoa(username + ":" + password)
          console.log(response.data.accessToken);
          const token =  'Bearer ' + response.data.accessToken
          const role = response.data.role
          const userId = response.data.userId
          storeToken(token)
          saveLoggedUser(username, role, userId)
          navigator('/home')
          window.location.reload(false);
        }).catch(err => {
          setError('Invalid Username or Password')
          console.log(err);
        })
        
    }

  return (
    <div className="TestMain">
      <div className="LoginComponent">
      <br></br> 
        <div className="auth-form-container">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
              <div className="inputBox">
                <label htmlFor="email"></label>
                <input 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  type="text" 
                  placeholder="username" 
                  id="username" 
                  name="username"
                  required 
                  className="input-field"
                />
              </div>
              <div className="inputBox">
                <label htmlFor="password"></label>
                <input 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  type="password" 
                  placeholder="********" 
                  id="password" 
                  name="password" 
                  required
                  className="input-field"
                />
              </div>
              {error?<Alert severity="error">{error}</Alert>:null}
              <br></br>
              <button type="submit" className="login-button">Login</button>
          </form>
      </div>
      <div className="text-section">
          <p>2023 © Saint Francis College - Clearance Portal</p>
        </div>
    </div>
    </div>
    
  )
}

export default LoginComponent