import React, { useEffect, useState } from 'react'
import { deleteViolation, getAllViolation, markViolationAsComplete } from '../../services/ViolationService'
import { useNavigate } from 'react-router-dom'
import './Violation.css'
import { Button, Alert, AlertTitle, Dialog, DialogContent, DialogTitle, Fab, Table, TablePagination } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NavigationIcon from '@mui/icons-material/Navigation';
import UpdateViolationForm from './UpdateViolationForm';

const ListViolationsComponent = () => {
    const [violations, setViolations] = useState([])
    const navigate = useNavigate()
    const [selectedStudent, setSelectedStudent] = useState([])
    const [selectedViolation, setSelectedViolation] = useState([])
    const [selectedViolationReporter, setSelectedViolationReporter] = useState([])
    const [violationDescription, setViolationDescription] = useState([])
    const [violationActionitem, setViolationActionItem] = useState([])
    const [openViolationOpen, setOpenViolationOpen] = useState(false)

    useEffect(() => {
        violationList();
    }, [])

    //FUNCTION TO HANDLE GET ALL VIOLATION API CALL
    function violationList() {
        getAllViolation().then((response) => {
            setViolations(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    //FUNCTION TO HANDLE UPDATE VIOLATION BUTTON
    function handleUpdateViolation(violation) {
        console.log("Update violation button is clicked.");
        setSelectedStudent(violation.studentId)
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

    //FUNCTION TO RENDER VIOLATION TABLE DYNAMICALLY
    function renderViolation() {
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
                                    <td>{violation.studentId}</td>
                                    <td>{violation.description}</td>
                                    <td>{violation.actionItem}</td>
                                    <td>{violation.facultyId}</td>
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

  return (
    <div className='ViolationListComponent'>
        <br></br>
        <h2 className='text-center'>LIST OF ALL STUDENT VIOLATIONS</h2>
        <br></br>
        {/* <Fab
        color='primary'
        aria-label='add'
        onClick={addNewViolation}
        >
            <AddIcon/>
        </Fab> */}
        {
            renderViolation()
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