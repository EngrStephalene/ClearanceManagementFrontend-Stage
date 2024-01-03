import { Alert, AlertTitle, Button, DialogContent, DialogTitle, Dialog, Fab, colors } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUserId, isAdminUser, isFacultyHead, isFacultyUser, isStudentUser } from '../../services/AuthService';
import { deleteStudentClearance, getAllClearanceRequest, getClearanceByFacultyId, getClearanceByStudentId, markClearanceAsApprove } from '../../services/ClearanceService';
import ClearanceForm from './ClearanceForm';
import CloseIcon from '@mui/icons-material/Close';
import NavigationIcon from '@mui/icons-material/Navigation';
import ClearanceRejectForm from './ClearanceRejectForm'
import { getStudentNumberByUserId } from '../../services/StudentService';
import './Clearance.css'
import { getRoleOfFaculty } from '../../services/UserService';

const ListClearanceComponent = () => {

  const isAdmin = isAdminUser();
  const isStudent = isStudentUser();
  const isFaculty = isFacultyUser();
  const isFacultyH = isFacultyHead();
  const [clearances, setClearance] = useState([])
  const [clearanceFormOpen, setClearanceFormOpen] = useState(false)
  const [clearanceRejectFormOpen, setClearanceRejectForm] = useState(false)
  const [selectedClearanceId, setSelectedClearanceId] = useState(false)
  const userId = getUserId();
  const [studentNumber, setStudentNumber] = useState([])
  const approvedStatus = {color: '#00bbf0', fontWeight: 'bold'}
  const pendingStatus = { color: '#dc2f2f'}

  useEffect(() => {
    console.log("Is User student: " + isStudent)
    getStudentIdFromDb(); //student id is referred to as student number in students table
    clearanceList();
  }, [])

      //IF USER ROLE IS STUDENT, FETCH THE STUDENT ID FROM STUDENT TABLE
      function getStudentIdFromDb() {
        if(isStudentUser()) {
            console.log("userId: " + userId)
            getStudentNumberByUserId(userId).then((response) => {
                console.log("Student ID: " + response.data)
                setStudentNumber(response.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }

  //GETS THE LIST OF CLEARANCE FROM DB
  function clearanceList() {
    if(isStudent) {
      getClearanceByStudentId(userId).then((response) => {
        setClearance(response.data)
        console.log(response.data)
      }).catch(err => {
        console.log(err)
      })
    } else if(isFaculty || isFacultyH) {
      getClearanceByFacultyId(userId).then((response) => {
        setClearance(response.data)
        console.log(response.data)
      }).catch(err => {
        console.log(err)
      })
    } else {
      getAllClearanceRequest().then((response) => {
        setClearance(response.data)
        console.log(response.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }

  //HANDLES CLEARANCE REQEUST BUTTON
  function handleClearanceRequest() {
    console.log("Request clearance button is clicked.")
    setClearanceFormOpen(true)
  }

  //FUNCTION TO HANDLE DELETE CLEARANCE BY STUDENT USER
  function handleDeleteStudentClearanceRequest() {
    console.log("Cancel student clearance request button is clicked.")
    deleteStudentClearance(userId).then((response) => {
      console.log(response.data)
      alert(response.data)
      window.location.reload(true)
    }).catch(err => {
      console.log(err)
    })
  }

  //FUNCTION TO HANDLE THE APPROVE BUTTON FOR DIFFERENT USERS
  function handleApproveClearanceButton(clearance) {
    if( (isAdmin || isFaculty || isFacultyH) && clearance.status === "Pending") {
      return <td>
        <Fab
        color='info' 
        variant="extended"
        style={{marginLeft: "10px"}}
        onClick = {() => approveClearanceRequest(clearance.id)}
        >
          <NavigationIcon sx={{ mr: 1 }} />
          Approve Clearance
        </Fab>
        </td>
    } else if((isAdmin || isFaculty || isFacultyH) && clearance.status === "Approved") {
      return <td>
        Approved Date on {clearance.approvedDate}
      </td>
    } else if((isAdmin || isFaculty || isFacultyH) && clearance.status === "Rejected") {
      return <td>
      <Fab
      color='info' 
      variant="extended"
      style={{marginLeft: "10px"}}
      disabled
      >
        <NavigationIcon sx={{ mr: 1 }} />
        Approve Clearance
      </Fab>
      </td>
    }
  }

  //FUNCTION TO HANDLE THE REJECT BUTTON FOR DIFFERENT USERS
  function handleRejectClearanceButton(clearance) {
    if((isAdmin || isFaculty || isFacultyH) && clearance.status === "Pending") {
      return <td>
        <Fab
        color='error' 
        variant="extended"
        style={{marginLeft: "10px"}}
        onClick = {() => rejectClearanceRequest(clearance.id)}
        >
          <NavigationIcon sx={{ mr: 1 }} />
          Reject Clearance
        </Fab>
      </td>
    } else if(isAdmin || isFaculty || isFacultyH) {
      return <td>
        <Fab
        color='error' 
        variant="extended"
        style={{marginLeft: "10px"}}
        onClick = {() => rejectClearanceRequest(clearance.id)}
        disabled
        >
          <NavigationIcon sx={{ mr: 1 }} />
          Reject Clearance
        </Fab>
      </td>
    }
  }

  function handleFacultyRole(clearance) {
    const roleOfFaculty = null
    getRoleOfFaculty(clearance.facultyId)
    .then((response) => {
      console.log(response.data)
      return <td>response.data</td>
    }).catch(err => {
      console.log(err)
    })
  }

  //FUNCTION TO HANDLE APPROVE CLEARANCE REQUEST
  function approveClearanceRequest(id) {
    console.log("Approve clearance " + id)
    markClearanceAsApprove(id).then((response) => {
      console.log(response.data)
      alert("Successfully approved clearance request.")
      window.location.reload(true)
    }).catch(err => {
      console.log(err)
    })
  }

  function rejectClearanceRequest(id) {
    console.log("Reject clearance " + id)
    setSelectedClearanceId(id)
    setClearanceRejectForm(true)
  }

  function renderStatus(status) {
    console.log(status)
    if(status == "Approved") {
      return <p style={approvedStatus}>Approved</p>
    } else if(status == "Rejected") {
      return <p style={pendingStatus}>Rejected</p>
    } else {
      return <p>{status}</p>
    }
  }

  //FUNCTION TO RENDER CLEARANCE REQUEST BASED ON USER ROLE
  function renderClearanceList() {
    if(clearances.length === 0) {
      if(isAdmin || isFacultyH || isFaculty) {
        return <Alert severity='info'>
        <AlertTitle>Info</AlertTitle>
        <strong>THERE ARE NO CLEARANCE REQUEST AT THIS TIME.</strong>
        </Alert>
      } else {
        return <Alert severity='info'>
        <AlertTitle>Info</AlertTitle>
        <strong>YOU HAVE NO CLEARANCE REQUEST AT THIS TIME.</strong>
        </Alert>
      }
    } else {
      return <div className='ClearanceComponent'>
        <br></br>
        <h2 className='text-center'>LIST OF CLEARANCE REQUESTS</h2>
        <br></br>
        <table className='table table-striped table-bordered shadow'>
          <thead>
            <tr>
              {
                (isAdmin || isFaculty || isFacultyH) && <th>Student</th>
              }
              <th>Description</th>
              <th>LogDate</th>
              <th>Status</th>
              <th>Approver</th>
              {
                (isAdmin || isFaculty || isFacultyH) && <th>Approve Clearance</th>
              }
              {
                (isAdmin || isFaculty || isFacultyH) && <th>Reject Clearance</th>
              }
            </tr>
          </thead>
          <tbody>
          {
              clearances.map( clearance =>
                  <tr key={clearance.id}>
                    {
                      (isAdmin || isFaculty || isFacultyH) && <td> {clearance.studentName} </td>
                    }
                    <td> {clearance.reason} </td>
                    <td> {clearance.logDate} </td>
                    <td> {renderStatus(clearance.status)} </td>
                    <td> {clearance.approverName} </td>
                    {
                      handleApproveClearanceButton(clearance)
                    }
                    {
                      handleRejectClearanceButton(clearance)
                    }
                  </tr>
                )
            }
          </tbody>
        </table>
      </div>
    }
  }

  //FUNCTION TO HANDLE BUTTONS FOR STUDENT USER
  function renderRequestClearanceButton() {
    var isAllApproved = false;
    if (isStudent && clearances.length === 0) {
      return <Button onClick={handleClearanceRequest} variant="outlined" startIcon={<AddIcon />}>
      REQUEST CLEARANCE
      </Button>
    } else if (isStudent) {
      return <Button onClick={handleDeleteStudentClearanceRequest} variant="outlined" color="error" startIcon={<DeleteIcon />}>
      CANCEL CLEARANCE REQUESTS
      </Button>
    }
  }

  return (
    <div>
      {
        renderRequestClearanceButton()
      }
      <br></br><br></br>
      {
        renderClearanceList()
      }

      <Dialog
      open = {clearanceFormOpen}
      onClose = {() => setClearanceFormOpen(false)}
      >
        <Button 
              color='primary'
              onClick={() => setClearanceFormOpen(false)}
              style={{marginLeft: "500px"}}
              >
                  <CloseIcon/>
        </Button>
        <DialogTitle textAlign={'center'}>Request Clearance Form</DialogTitle>
        <DialogContent dividers>
          <ClearanceForm/>
        </DialogContent>
      </Dialog>

      <Dialog
      open = {clearanceRejectFormOpen}
      onClose = {() => setClearanceRejectForm(false)}
      >
        <Button 
              color='primary'
              onClick={() => setClearanceRejectForm(false)}
              style={{marginLeft: "500px"}}
              >
                  <CloseIcon/>
        </Button>
        <DialogTitle textAlign={'center'}>Reject Clearance Form</DialogTitle>
        <DialogContent dividers>
          <ClearanceRejectForm
          id = {selectedClearanceId}
          >
          </ClearanceRejectForm>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ListClearanceComponent