import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { deleteFaculty, getAllFaculty } from '../../services/FacultyService'
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogContent, DialogTitle, Fab } from '@mui/material';
import FacultyForm from './FacultyForm';
import CloseIcon from '@mui/icons-material/Close';
import FacultyHeadForm from './FacultyHeadForm';
import { isAdminUser, isFacultyHead } from '../../services/AuthService';
import './Faculty.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateFacultyForm from './UpdateFacultyForm';
import { getRoleOfFaculty } from '../../services/UserService';

const ListFacultyComponent = () => {
  const [faculties, setFaculties] = useState([])
  const [addFacultyOpen, setAddFacultyOpen] = useState(false)
  const [updateFacultyOpen, setUpdateFacultyOpen] = useState(false)
  const [addFacultyHeadOpen, setAddFacultyHeadOpen] = useState(false)
  const [selectedFacultyForUpdate, setSelectedFacultyForUpdate] = useState([])
  const [officeOfSelectedFaculty, setOfficeOfSelectedFaculty] = useState([])
  const isAdmin = isAdminUser();
  const isFacultyH = isFacultyHead();
  const deleteButtonStyle = {transform: 'scale(0.9)'}

  useEffect(() => {
    console.log(isAdmin)
    console.log(isFacultyH)
    facultyList();
  },[])

  function facultyList() {
    getAllFaculty().then((response) => {
      setFaculties(response.data);
      console.log(response.data);
    }).catch(error => {
      console.log("error" + error)
    })
  }

  function handleAddFaculty() {
    console.log("Add faculty button is clicked.")
    setAddFacultyOpen(true)
  }

  function handleAddFacultyHead() {
    console.log("Add faculty head button is clicked")
    setAddFacultyHeadOpen(true)
  }

  function handleUpdateFaculty(faculty) {
    console.log("Update faculty button is clicked.")
    setSelectedFacultyForUpdate(faculty)
    // getRoleOfFaculty(faculty.id)
    // .then((response) => {
    //   console.log(response.data)
    //   setOfficeOfSelectedFaculty(response.data)
    // }).catch(err => {
    //   console.log(err)
    // })
    setUpdateFacultyOpen(true)
  }

  function handleDeleteFaculty(id) {
    console.log("Delete faculty button is clicked.")
    console.log(id)
    deleteFaculty(id)
    .then((response) => {
      console.log(response.data)
      alert("Successfully deleted faculty.")
      window.location.reload(true)
    }).catch(err => {
      console.log(err)
      alert("There was an error while deleting faculty. Kindly contact admin.")
      window.location.reload(true)
    })
  }

  //THIS FUNCTION IS TO RENDER EDIT BUTTON IN THE TABLE COLUMN
  function renderEditButton(faculty) {
    if(faculty.id == 1) {
      return <Fab
      color="secondary" 
      aria-label="edit"
      onClick={() => handleUpdateFaculty(faculty)}
      style={{ transform: 'scale(0.9)' }}
      disabled
      >
      <EditIcon/>
      </Fab>
    } else {
      return <Fab
      color="secondary" 
      aria-label="edit"
      onClick={() => handleUpdateFaculty(faculty)}
      style={{ transform: 'scale(0.9)' }}
      >
      <EditIcon/>
      </Fab>
    }
  }

  //FUNCTION TO RENDER DELETE BUTTON IN THE TABLE COLUMN
  function renderDeleteButton(id) {
    if(id == 1) {
      return <Fab
          color="error" 
          aria-label="delete"
          onClick={() => handleDeleteFaculty(id)}
          style={deleteButtonStyle}
          disabled
         >
          <DeleteIcon/>
        </Fab>
    } else {
      return <Fab
        color="error" 
        aria-label="delete"
        onClick={() => handleDeleteFaculty(id)}
        style={deleteButtonStyle}
      >
        <DeleteIcon/>
      </Fab>
    }
  }

  function handleCloseUpdateFacultyForm() {
    setUpdateFacultyOpen(false)
    setOfficeOfSelectedFaculty()
  }

  return (
    <div className='FacultyComponent'>
      <br></br>
      <h2 className='text-center'>LIST OF FACULTIES</h2>
      <br></br>
      {
        isAdmin || isFacultyH &&
        <Button onClick={handleAddFaculty} variant='contained' color='success' startIcon={<AddIcon />}>
          ADD FACULTY
        </Button>
      }
      {
        isAdmin && 
        <Button style={{marginLeft: "15px"}} onClick={handleAddFacultyHead} variant='contained' color='success' startIcon={<AddIcon />}>
          ADD FACULTY
        </Button>
      }
      
      <br></br><br></br>
      <table className='table table-striped table-bordered shadow' style={{width:"96%"}}>
        <thead>
          <tr>
            <th>FACULTY ID</th>
            <th>NAME</th>
            <th>Office</th>
            <th>EMAIL</th>
            <th>ADDRESS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
              {
                faculties.map( faculty =>
                    <tr key={faculty.id}>
                      <td> {faculty.facultyNumber} </td>
                      <td> {faculty.firstName} {faculty.lastName}</td>
                      <td> {faculty.facultyOffice} </td>
                      <td> {faculty.email} </td>
                      <td> {faculty.address} </td>
                      <td>
                        {renderEditButton(faculty)}
                        {renderDeleteButton(faculty.id)}
                      </td>
                    </tr>
                  )
              }
            </tbody>
      </table>

        <Dialog
        open = {addFacultyOpen}
        onClose={() => setAddFacultyOpen(false)}
        >
          <Button 
              color='primary'
              onClick={() => setAddFacultyOpen(false)}
              style={{marginLeft: "500px"}}
              >
                  <CloseIcon/>
          </Button>
          <DialogTitle textAlign={'center'}>ADD FACULTY FORM</DialogTitle>
          <DialogContent dividers>
            <FacultyForm/>
          </DialogContent>
        </Dialog>

        <Dialog
        open = {addFacultyHeadOpen}
        onClose={() => setAddFacultyHeadOpen(false)}
        >
          <Button 
              color='primary'
              onClick={() => setAddFacultyHeadOpen(false)}
              style={{marginLeft: "500px"}}
              >
                  <CloseIcon/>
          </Button>
          <DialogTitle textAlign={'center'}>ADD FACULTY HEAD FORM</DialogTitle>
          <DialogContent dividers>
            <FacultyHeadForm/>
          </DialogContent>
        </Dialog>

        <Dialog
        open = {updateFacultyOpen}
        onClose={() => setUpdateFacultyOpen(false)}
        >
          <Button 
              color='primary'
              onClick={() => handleCloseUpdateFacultyForm()}
              style={{marginLeft: "500px"}}
              >
                  <CloseIcon/>
          </Button>
          <DialogTitle textAlign={'center'}>UPDATE FACULTY FORM</DialogTitle>
          <DialogContent dividers>
            <UpdateFacultyForm
              pFacultyId = {selectedFacultyForUpdate.id}
              pFacultyNumber = {selectedFacultyForUpdate.facultyNumber}
              pFirstName = {selectedFacultyForUpdate.firstName}
              pMiddleName = {selectedFacultyForUpdate.middleName}
              pLastName = {selectedFacultyForUpdate.lastName}
              pAddress = {selectedFacultyForUpdate.address}
              pEmail = {selectedFacultyForUpdate.email}
              pOffice = {officeOfSelectedFaculty}
            />
          </DialogContent>
        </Dialog>
    </div>
  )
}

export default ListFacultyComponent