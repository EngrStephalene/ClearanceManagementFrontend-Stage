import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {deleteStudent, getAllStudent} from '../../services/StudentService'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Dialog, DialogContent, DialogTitle, Fab, Button } from '@mui/material'
import './Student.css'
import CloseIcon from '@mui/icons-material/Close';
import ViolationForm from '../Violation/ViolationForm';
import AddIcon from '@mui/icons-material/Add';
import StudentForm from './StudentForm';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import UpdateStudentForm from './UpdateStudentForm';
import DeleteIcon from '@mui/icons-material/Delete';

const ListStudentsComponent = () => {
  const[students, setStudents] = useState([])
  const navigator = useNavigate();
  const {id} = useParams();
  const [addViolationOpen, setAddViolationOpen] = useState(false)
  const [addStudentOpen, setAddStudentOpen] = useState(false)
  const [updateStudentOpen, setUpdateStudentOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState([])
  const [selectedStudentFirstname, setSelectedStudentFirstname] = useState([])
  const [selectedStudentLastname, setSelectedStudentLastname] = useState([])
  const [selectedStudentForUpdate, setSelectedStudentForUpdate] = useState([])

  useEffect(() => {
    studentList();
  },[])

  //FUNCTION FOR GET ALL STUDENT API
  function studentList() {
    getAllStudent().then((response) => {
      setStudents(response.data);
      console.log(response.data);
    }).catch(error => {
      console.log("error" + error);
      // <Alert severity="error">Error while fetching student list. Please contact administrator.</Alert>
    })
  }

  //FUNCTION FOR ADD VIOLATION API
  function addViolation(firstname, lastname, studentNumber) {
    console.log("ADD VIOLATION BUTTON IS CLICKED.");
    setSelectedStudent(studentNumber)
    setSelectedStudentFirstname(firstname)
    setSelectedStudentLastname(lastname)
    setAddViolationOpen(true)
  }

  //FUNCTION FOR ADD STUDENT FORM
  function handleAddStudent() {
    console.log("Add student button is clicked.")
    setAddStudentOpen(true)
  }

  //FUNCTION FOR EDIT STUDENT FORM
  function handleUpdateStudent(student) {
    console.log("Update student button is clicked.")
    setUpdateStudentOpen(true)
    setSelectedStudentForUpdate(student)
  }

  //FUNCTION FOR DELETE STUDENT
  function handleDeleteStudent(id) {
    console.log("Delete student button is clicked.")
    deleteStudent(id)
    .then((response) => {
      console.log(response)
      alert("Successfully deleted student.")
      window.location.reload(true)
    }).catch(err => {
      console.log(err)
      alert("There was an error while deleting student. Kindly contact administrator.")
      window.location.reload(true)
    })
  }

  return (
    <div className='StudentComponent'>
      <div className="input-group rounded">
        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
        <span className="input-group-text border-0" id="search-addon">
            <SearchIcon/>
        </span>
      </div>
      <br></br>
      <h2 className='text-center'>LIST OF STUDENTS</h2>
      <br></br>
      <Button onClick={handleAddStudent} variant="outlined" startIcon={<AddIcon />}>
        ADD STUDENT
      </Button>
      <br></br><br></br>
      <table className='table table-striped table-bordered shadow'>
        <thead>
          <tr>
            <th>STUDENT ID</th>
            <th>FIRST NAME</th>
            <th>MIDDLE NAME</th>
            <th>LAST NAME</th>
            <th>EMAIL</th>
            <th>ADDRESS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
            {
              students.map( student =>
                  <tr key={student.id}>
                    <td> {student.studentNumber} </td>
                    <td> {student.firstName} </td>
                    <td> {student.middleName} </td>
                    <td> {student.lastName} </td>
                    <td> {student.email} </td>
                    <td> {student.address} </td>
                    <td>
                      <Fab
                        color="secondary" 
                        aria-label="edit"
                        onClick={() => handleUpdateStudent(student)}
                      >
                        <EditIcon/>
                      </Fab>
                      <Fab
                        color="error" 
                        aria-label="delete"
                        onClick={() => handleDeleteStudent(student.id)}
                        style={{marginLeft: "10px"}}
                       >
                        <DeleteIcon/>
                      </Fab>
                      <Fab
                      aria-label='violation' 
                      variant="extended"
                      style={{marginLeft: "10px"}}
                      onClick={() => addViolation(student.firstName, student.lastName, student.studentNumber)}
                      color='success'>
                        <SentimentDissatisfiedIcon sx={{ mr: 1 }}/>
                        Add Violation
                      </Fab>
                      {/* <button onClick={() => addViolation(student.id)} className='btn btn-info'>Add Violation</button> */}
                    </td>
                  </tr>
                )
            }
          </tbody>
      </table>

      <Dialog
      open = {addViolationOpen}
      onClose={() => setAddViolationOpen(false)}
      >
        <Button 
            color='primary'
            onClick={() => setAddViolationOpen(false)}
            style={{marginLeft: "500px"}}
            >
                <CloseIcon/>
        </Button>
        <DialogTitle textAlign={'center'}>ADD VIOLATION FOR STUDENT</DialogTitle>
        <DialogContent dividers>
          <ViolationForm
          studentNumber = {selectedStudent}
          studentFname = {selectedStudentFirstname}
          studentLname = {selectedStudentLastname}
          >

          </ViolationForm>
        </DialogContent>
      </Dialog>

      <Dialog
      open = {addStudentOpen}
      onClose={() => setAddStudentOpen(false)}
      >
        <Button 
            color='primary'
            onClick={() => setAddStudentOpen(false)}
            style={{marginLeft: "500px"}}
            >
                <CloseIcon/>
        </Button>
        <DialogTitle textAlign={'center'}>ADD STUDENT FORM</DialogTitle>
        <DialogContent dividers>
         <StudentForm/>
        </DialogContent>
      </Dialog>

      <Dialog
      open = {updateStudentOpen}
      onClose={() => setUpdateStudentOpen(false)}
      >
        <Button 
            color='primary'
            onClick={() => setUpdateStudentOpen(false)}
            style={{marginLeft: "500px"}}
            >
                <CloseIcon/>
        </Button>
        <DialogTitle textAlign={'center'}>UPDATE STUDENT FORM</DialogTitle>
        <DialogContent dividers>
         <UpdateStudentForm
          pUserId = {selectedStudentForUpdate.userId}
          pFirstName = {selectedStudentForUpdate.firstName}
          pMiddleName = {selectedStudentForUpdate.middleName}
          pLastName = {selectedStudentForUpdate.lastName}
          pStudentNumber = {selectedStudentForUpdate.studentNumber}
          pEmail = {selectedStudentForUpdate.email}
          pAddress = {selectedStudentForUpdate.address}
         />
        </DialogContent>
      </Dialog>
  
    </div>
  )
}

export default ListStudentsComponent