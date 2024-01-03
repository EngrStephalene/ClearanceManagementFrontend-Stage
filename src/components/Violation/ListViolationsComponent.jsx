import React, { useEffect, useState } from 'react'
import { deleteViolation, getAllViolation, markViolationAsComplete, getStudentViolations } from '../../services/ViolationService'
import { useNavigate } from 'react-router-dom'
import './Violation.css'
import { Button, Alert, AlertTitle, Dialog, DialogContent, DialogTitle, Fab, Table, TablePagination } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NavigationIcon from '@mui/icons-material/Navigation';
import UpdateViolationForm from './UpdateViolationForm';
import { isStudentUser, getUserId, isAdminUser, isFacultyHead, isFacultyUser } from '../../services/AuthService';
import { getStudentNumberByUserId, getStudentNameByUserId } from '../../services/StudentService';

const ListViolationsComponent = () => {
    const [violations, setViolations] = useState([])
    const [studentViolations, setStudentViolations] = useState([])
    const navigate = useNavigate()
    const [selectedStudent, setSelectedStudent] = useState([])
    const [selectedStudentName, setSelectedStudentName] = useState([])
    const [selectedViolation, setSelectedViolation] = useState([])
    const [selectedViolationReporter, setSelectedViolationReporter] = useState([])
    const [violationDescription, setViolationDescription] = useState([])
    const [violationActionitem, setViolationActionItem] = useState([])
    const [openViolationOpen, setOpenViolationOpen] = useState(false)
    const [studentNumber, setStudentNumber] = useState([])
    const [studentName, setStudentName] = useState([])
    const userId = getUserId()

    useEffect(() => {
        getStudentIdFromDb(); //student id is referred to as student number in students table
        getStudentNameFromDb();
        violationList();
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

    //IF USER ROLE IS STUDENT, FETCH THE STUDENT NAME FROM STUDENT TABLE
    function getStudentNameFromDb() {
        if(isStudentUser()) {
            getStudentNameByUserId(userId).then((response) => {
                console.log("Student Name: " + response.data)
                setStudentName(response.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    //FUNCTION TO HANDLE GET ALL VIOLATION API CALL
    function violationList() {
        getAllViolation().then((response) => {
            console.log(response.data)
            setViolations(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    //FUNCTION TO HANDLE UPDATE VIOLATION BUTTON
    function handleUpdateViolation(violation) {
        console.log("Update violation button is clicked.");
        setSelectedStudent(violation.studentId)
        setSelectedStudentName(violation.studentName)
        setSelectedViolation(violation.id)
        setSelectedViolationReporter(violation.facultyId)
        setViolationDescription(violation.description)
        setViolationActionItem(violation.actionItem)
        setOpenViolationOpen(true)
    }

    //FUCNTION TO HANDLE DELETE VIOLATION
    function handleDelete(id) {
        console.log("Delete violation for " + id + " is clicked.")
        deleteViolation(id)
        .then((response) => {
            console.log(response)
            alert("Successfully deleted violation!")
            window.location.reload(true)
        }).catch(err => {
            console.log(err)
        })
    }

    //FUNCTION TO HANDLE MARK COMPLETE
    function markComplete(id) {
        console.log("Mark complete button is clicked.")
        markViolationAsComplete(id).then((response) => {
            console.log(response.data)
            window.location.reload(true)
        }).catch(err => {
            console.log(err)
        })
    }

    //FUNCTION TO HANDLE COMPLETE VIOLATION BUTTON
    //BUTTON MUST BE DISABLED IF VIOLATION IS ALREADY COMPLETE
    function renderMarkCompleteButton(violation) {
        if(violation.completed) {
            return <Fab
            color='info' 
            variant="extended"
            style={{marginLeft: "10px"}}
            onClick={() => markComplete(violation.id)}
            disabled
            >
                <NavigationIcon sx={{ mr: 1 }} />
                Mark Resolved
            </Fab>
        } else {
            return <Fab
            color='info' 
            variant="extended"
            style={{marginLeft: "10px"}}
            onClick={() => markComplete(violation.id)}
            >
                <NavigationIcon sx={{ mr: 1 }} />
                Mark Resolved
            </Fab>
        }
    }

    //FUNCTION FOR COMPLETE/INCOMPLETE COLUMN
    function renderCompleteIncompleteColumn(completed) {
        if(completed) {
            return <td style={{color:"green"}}>RESOLVED</td>
        } else {
            return <td style={{color:"red"}}>UNRESOLVED</td>
        }
    }

    //FUNCTION TO RENDER VIOLATION TABLE DYNAMICALLY (FOR ADMIN AND FACULTIES ROLE)
    function renderViolation() {
        console.log("RENDER VIOLATION LIST - ADMIN AND FACULTY ROLES.")
        if(violations.length === 0) {
            console.log("GET ALL VIOLATIONS RETURNED EMPTY.");
            return <Alert severity='info'>
                <AlertTitle>Info</AlertTitle>
                <strong>NO STUDENT VIOLATIONS RECORD AT THIS TIME.</strong>
            </Alert>
        } else {
            console.log("GET ALL VIOLATIONS IS NOT EMPTY.")
            return <div>
                <table className='table table-bordered table-striped shadow'>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Remarks</th>
                            <th>Action Item</th>
                            <th>Reporter</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            violations.map(violation => 
                                <tr key={violation.id}>
                                    <td>{violation.studentName}</td>
                                    <td>{violation.description}</td>
                                    <td>{violation.actionItem}</td>
                                    <td>{violation.facultyName}</td>
                                    {/* <td>{violation.completed ? 'COMPLETED': 'INCOMPLETE'}</td> */}
                                    {
                                        renderCompleteIncompleteColumn(violation.completed)
                                    }
                                    <td>
                                        <Fab
                                        color="secondary" 
                                        aria-label="edit"
                                        onClick={() => handleUpdateViolation(violation)}
                                        >
                                            <EditIcon/>
                                        </Fab>
                                        <Fab
                                        color="error" 
                                        aria-label="delete"
                                        onClick={() => handleDelete(violation.id)}
                                        style={{marginLeft: "10px"}}
                                        >
                                            <DeleteIcon/>
                                        </Fab>
                                        {
                                            renderMarkCompleteButton(violation)
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        }
    }

    //RENDER THE TABLE DYNAMICALLY (USER ROLE = STUDENT)
    function renderStudentViolation() {
        console.log("RENDER VIOLATION LIST - STUDENT ROLES.")
        if(violations.length === 0) {
            console.log("GET ALL VIOLATIONS RETURNED EMPTY.");
            return <Alert severity='info'>
                <AlertTitle>Info</AlertTitle>
                <strong>NO STUDENT VIOLATIONS RECORD AT THIS TIME.</strong>
            </Alert>
        } else {
            console.log("GET ALL VIOLATIONS IS NOT EMPTY.")
            return <div>
                <table className='table table-bordered table-striped shadow'>
                    <thead>
                        <tr>
                            <th>Log Date</th>
                            <th>Remarks</th>
                            <th>Action Item</th>
                            <th>Reporter</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            violations.map(violation =>
                                violation.studentId == studentNumber &&
                                <tr key={violation.id}>
                                    <td>{violation.logDate}</td>
                                    <td>{violation.description}</td>
                                    <td>{violation.actionItem}</td>
                                    <td>{violation.facultyName}</td>
                                    {/* <td>{violation.completed ? 'COMPLETED': 'INCOMPLETE'}</td> */}
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        }
    }

  return (
    <div className='ViolationListComponent'>
        <br></br>
        {
            (isAdminUser() || isFacultyHead() || isFacultyUser()) &&
            <h2 className='text-center'>LIST OF STUDENT VIOLATIONS</h2>
        }
        {
            isStudentUser() &&
            <h2 className='text-center'>LIST OF VIOLATIONS FOR {studentName}</h2>
        }
        <br></br>
        {/* <Fab
        color='primary'
        aria-label='add'
        onClick={addNewViolation}
        >
            <AddIcon/>
        </Fab> */}
        {
            (isAdminUser() || isFacultyHead() || isFacultyUser()) &&
            renderViolation()
        }
        {
            isStudentUser() &&
            renderStudentViolation()
        }

        <Dialog
        open = {openViolationOpen}
        onClose={() => setOpenViolationOpen(false)}
        >
            <Button 
            color='primary'
            onClick={() => setOpenViolationOpen(false)}
            style={{marginLeft: "500px"}}
            >
                <CloseIcon/>
            </Button>
            <DialogTitle textAlign={'center'}>UPDATE VIOLATION FOR STUDENT</DialogTitle>
            <DialogContent dividers>
                <UpdateViolationForm
                 violationId = {selectedViolation}
                 facultyId = {selectedViolationReporter}
                 studentId = {selectedStudent}
                 studentName = {selectedStudentName}
                 violationDescription = {violationDescription}
                 violationActionItem = {violationActionitem}
                >

                </UpdateViolationForm>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default ListViolationsComponent