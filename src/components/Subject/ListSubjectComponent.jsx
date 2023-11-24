import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {deleteSubject, getAllSubject} from '../../services/SubjectService'
import './Subject.css'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors'
import NavigationIcon from '@mui/icons-material/Navigation';
import { isAdminUser } from '../../services/AuthService'

const ListSubjectComponent = () => {
    const [subjects, setSubjects] = useState([])
    const navigator = useNavigate();
    const { id } = useParams();
    const [open, setOpen] = useState(false)
    const isAdmin = isAdminUser();

    useEffect(() => {
        subjectList();
    }, [])

    //FUNCTION TO DISPLAY SUBJECT LIST FROM GET ALL SUBJECT API
    function subjectList() {
        getAllSubject().then((response) => {
            setSubjects(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    //FUNCTION FOR UPDATE SUBJECT BUTTON
    function updateSubject(id) {
        console.log("UPDATE SUBJECT BUTTON IS CLICKED.")
        navigator(`/update-subject/${id}`)
    }
    
    //FUNCTION FOR VIEW ENROLLED STUDENTS BUTTON (TO ADD LOGIC IN THE BACKENDS)
    function viewEnrolledStudents() {
        console.log("VIEW ENROLLED STUDENTS BUTTON IS CLICKED.")
    }

    //FUNCTION FOR DELETE SUBJECT BUTTON
    function handleDelete(id) {
        console.log("DELETE SUBJECT BUTTON IS CLICKED.")
        deleteSubject(id)
        .then((response) => {
            console.log("DELETED RECORD " + response)
            setOpen(true)
            // alert("Succcessfully deleted subject.") //TODO CHANGE TO POP UP MESSAGE IN THE CENTER
            // window.location.reload(true)
        }).catch(error => {
            console.log(error);
        })
    }

    //FUNCTION TO HANDLE THE DIAALOG BOX
    function handleCloseDialog() {
        setOpen(false)
        window.location.reload(true)
    }

    //FUNCTION TO HANDLE ADD SUBJECT BUTTON
    function handleAddSubjectButton() {
        navigator('/add-subject')
    }

  return (
    <div className='SubjectListComponent'>
        <br></br>
        <h2 className='text-center'>LIST OF SUBJECTS</h2>
        <br></br>
        {
            isAdmin && 
            <Button onClick={handleAddSubjectButton} variant="outlined" startIcon={<AddIcon />}>
            ADD SUBJECT
            </Button>
        }
        <br></br><br></br>
        <table className='table table-striped table-bordered shadow'>
            <thead>
                <tr>
                    <th>Subject Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    subjects.map( subject => 
                            <tr key={subject.id}>
                                <td> {subject.subjectName} </td>
                                <td>
                                    <Fab 
                                    color="secondary" 
                                    aria-label="edit"
                                    onClick={() => updateSubject(subject.id)}
                                    >
                                        <EditIcon/>
                                    </Fab>
                                    <Fab 
                                    aria-label="delete"
                                    color="error"
                                    onClick={() => handleDelete(subject.id)}
                                    style={{marginLeft: "10px"}}
                                    >
                                        <DeleteIcon/>
                                    </Fab>
                                {/* <button onClick={() => updateSubject(subject.id)} className='btn btn-info'>Update</button> */}
                                    {/* <button onClick={() => handleDelete(subject.id)} className='btn btn-danger'
                                        style={{marginLeft: "10px"}}>
                                            Delete
                                    </button> */}
                                    <Fab
                                    color='info' 
                                    variant="extended"
                                    style={{marginLeft: "10px"}}
                                    onClick={() => viewEnrolledStudents()}
                                    >
                                        <NavigationIcon sx={{ mr: 1 }} />
                                        View Enrolled
                                    </Fab>
                                    {/* <button onClick={() => viewEnrolledStudents()} 
                                    className='btn btn-info'
                                    style={{marginLeft: "10px"}}>
                                        View Enrolled Students
                                    </button> */}
                                </td>
                            </tr>
                        )
                }
            </tbody>
        </table>

        <Dialog 
        open = {open}
        onClose={() => setOpen(false)}
        aria-labelledby='dialog-title' 
        aria-describedby='dialog-description'>
            <DialogTitle id='dialog-title'>SUCCESSFULLY DELETED SUBJECT</DialogTitle>
            <DialogContent>
                <DialogContentText id='dialog-description'>
                        You have successfully deleted subject. If this is a mistake. Please contact admin immediately.
                </DialogContentText>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default ListSubjectComponent