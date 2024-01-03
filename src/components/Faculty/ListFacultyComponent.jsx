import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { getAllFaculty } from '../../services/FacultyService'
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import FacultyForm from './FacultyForm';
import CloseIcon from '@mui/icons-material/Close';
import FacultyHeadForm from './FacultyHeadForm';
import { isAdminUser, isFacultyHead } from '../../services/AuthService';
import './Faculty.css'

const ListFacultyComponent = () => {
  const [faculties, setFaculties] = useState([])
  const [addFacultyOpen, setAddFacultyOpen] = useState(false)
  const [addFacultyHeadOpen, setAddFacultyHeadOpen] = useState(false)
  const isAdmin = isAdminUser();
  const isFacultyH = isFacultyHead();

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

  return (
    <div className='FacultyComponent'>
      <br></br>
      <h2 className='text-center'>LIST OF FACULTIES</h2>
      <br></br>
      {
        isAdmin || isFacultyH &&
        <Button onClick={handleAddFaculty} variant='outlined' startIcon={<AddIcon />}>
          ADD FACULTY
        </Button>
      }
      {
        isAdmin && 
        <Button style={{marginLeft: "15px"}} onClick={handleAddFacultyHead} variant='outlined' startIcon={<AddIcon />}>
          ADD FACULTY HEAD
        </Button>
      }
      
      <br></br><br></br>
      <table className='table table-striped table-bordered shadow'>
        <thead>
          <tr>
            <th>FACULTY ID</th>
            <th>FIRST NAME</th>
            <th>MIDDLE NAME</th>
            <th>LAST NAME</th>
            <th>EMAIL</th>
            <th>ADDRESS</th>
          </tr>
        </thead>
        <tbody>
              {
                faculties.map( faculty =>
                    <tr key={faculty.id}>
                      <td> {faculty.facultyNumber} </td>
                      <td> {faculty.firstName} </td>
                      <td> {faculty.middleName} </td>
                      <td> {faculty.lastName} </td>
                      <td> {faculty.email} </td>
                      <td> {faculty.address} </td>
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

    </div>
  )
}

export default ListFacultyComponent