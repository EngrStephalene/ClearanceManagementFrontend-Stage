import React, { useEffect, useState } from 'react'; // Import useState for managing state
import './Profile.css';
import { getLoggedInUser, getRole, getUserId, isAdminUser, isFacultyHead, isFacultyUser, isStudentUser } from '../../services/AuthService';
import { getFacultyInformation } from '../../services/FacultyService';
import { getStudentInformation } from '../../services/StudentService';

const ProfileComponent = () => {
  const [activeTab, setActiveTab] = useState(0); // Initialize activeTab state
  const [selectedFile, setSelectedFile] = useState(null);
  const isAdmin = isAdminUser();
  const isFaculty = isFacultyUser();
  const isStudent = isStudentUser();
  const isFacultyH = isFacultyHead();
  const [userInformation, setUserInformation] = useState([])

  useEffect(() => {
    getUserInformationFromDb();
  }, [])

  //FUNCTION TO GET USER INFORMATION FROM DB BASED ON USER ROLE
  function getUserInformationFromDb() {
    const userId = getUserId();
    const username = getLoggedInUser();
    const role = getRole();

    const info = {userId, username, role}

    if(isStudent) {
      console.log("Student role ")
      getStudentInformation(userId).then((response) => {
        console.log(response.data)
        setUserInformation(response.data)
      }).catch(err => {
        console.log(err)
      })
    } else {
      console.log(info)
      getFacultyInformation(userId).then((response) => {
        console.log(response.data)
        setUserInformation(response.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
 
  // Define handleTabClick to update the activeTab state
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  //FUNCTION TO HANDLE FILE CHANGE
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  //FUNCTION TO HANDLE UPLOAD PHOTO (FOR FUTURE IMPLEMENTATION)
  const handleUpload = () => {
    // Handle the upload logic here, e.g., send the selectedFile to your server.
    if (selectedFile) {
      // You can add your logic to upload the file here.
      console.log('Uploading file:', selectedFile);
    }
  };

  //
  function renderUserInformation() {

  }

  return (
    <div className='ProfileComponent'>
      <br></br>
      <div className='MainProfile'>
        <h2>PROFILE</h2>
      </div>
      <p>View and update your personal details</p>
      <div className="tab-widget">
        <div className="tab-buttons">
          <button
            className={activeTab === 0 ? 'active' : ''}
            onClick={() => handleTabClick(0)}
          >
            Personal Details 
          </button>
          <button
            className={activeTab === 1 ? 'active' : ''}
            onClick={() => handleTabClick(1)}
          >
            Photo
          </button>
          <button
            className={activeTab === 4 ? 'active' : ''}
            onClick={() => handleTabClick(4)}
          >
            Reset Password
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 0 &&
            <div className="basic-info">
            <h2>Basic Info</h2>
            <ul>
              <li>Name: {userInformation.firstName}  {userInformation.middleName}  {userInformation.lastName}</li>
              {/* <li>Birthday: </li>
              <li>Birthplace: </li>
              <li>Gender: </li> */}
              <li>Address: {userInformation.address}</li>
              {/* <li>Mobile Number:</li> */}
              <li>Email Address: {userInformation.email}</li>
            </ul>
            <div className="parents-info">
            {/* <h2>Parents Info</h2>
            <ul>
              <li>Mother's Name:</li>
              <li>Father's Name: </li>
              <li>Birthday: </li>
              <li>Birthplace: </li>
              <li>Gender: </li>
              <li>Citizenship: </li>
              <li>Civil Status: </li>
            </ul> */}
            </div>
          </div>}
          {activeTab === 1 && (
      
        <div className="tab-content2">
          <p>Profile Pic</p>
          <br></br>
          <p>Upload Photo</p>
          <div className="file-input-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="image-box">
          {selectedFile && (
            <div className='file-container'>
            <div className="selected-file-preview">
              <div className="image-container"> </div>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected"
                className="selected-image"
              />
               <div className="image-box-border"></div> 
              <p> Selected: {selectedFile.name}</p>
              </div>
            </div>
          )}        
          </div>
          <br></br>
            <button onClick={handleUpload}>Upload</button>
        </div>

      )}
          {activeTab === 2 && <div>Content for Tab 3</div>}
          {activeTab === 3 && <div>Content for Tab 4</div>}
          {activeTab === 4 && <div className="password-reset"><h4>Reset Password</h4>
    <form className="password-reset-form">
      <label htmlFor="current-password">Current Password:</label>
      <input type="password" id="current-password" />
            <br />
      <label htmlFor="new-password">New Password:   </label>
      <input type="password" id="new-password" />
            <br />
      <label htmlFor="confirm-password">Confirm Password:</label>
      <input type="password" id="confirm-password" />
            <br />
      <button type="submit">Reset Password</button>
    </form></div>}
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
