import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {deleteSubject, getAllSubject} from '../../services/SubjectService'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors'
import NavigationIcon from '@mui/icons-material/Navigation';
import { isAdminUser } from '../../services/AuthService'
import { deleteOffice, getAllOffice } from '../../services/OfficeService'
import OfficeForm from './OfficeForm';
import CloseIcon from '@mui/icons-material/Close';

const ListOfficesComponent = () => {
    const [offices, setOffices] = useState([])
    const navigator = useNavigate();
    const { id } = useParams();
    const [addOfficeOpen, setAddOfficeOpen] = useState(false)
    const isAdmin = isAdminUser();

    useEffect(() => {
        officesList();
    }, [])

    //FUNCTION TO FETCH ALL OFFICES
    function officesList() {
        getAllOffice().then((response) => {
            console.log(response.data)
            setOffices(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    //FUNCTION FOR ADD OFFICE API
    function handleAddOfficeButton() {
        setAddOfficeOpen(true)
    }

    //FUNCTION FOR UPDATE SUBJECT BUTTON
    function updateOffice(id) {
        console.log("UPDATE SUBJECT BUTTON IS CLICKED.")
    }
    

    //FUNCTION FOR DELETE SUBJECT BUTTON
    function handleDelete(id) {
        console.log("DELETE OFFICE BUTTON IS CLICKED.")
        deleteOffice(id)
        .then((response) => {
            console.log("SUCCESSFULLY DELETED RECORD " + response)
            alert("Succcessfully deleted office.") //TODO CHANGE TO POP UP MESSAGE IN THE CENTER
            window.location.reload(true)
        }).catch(error => {
            alert("There was an error while deleting office. Kindly contact admin.") //TODO CHANGE TO POP UP MESSAGE IN THE CENTER
            window.location.reload(true)
        })
    }

  return (
    <div className='SubjectListComponent'>
        <br></br>
        <h2 className='text-center'>LIST OF OFFICES</h2>
        {
            isAdmin && 
            <Button onClick={handleAddOfficeButton} variant="contained" color='success' startIcon={<AddIcon />}>
            ADD OFFICE
            </Button>
        }
        <br></br><br></br>
        <table className='table table-striped table-bordered shadow' style={{width:'96%'}}>
            <thead>
                <tr>
                    <th>Office</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    offices.map( office => 
                            <tr key={office.id}>
                                <td> {office.name} </td>
                                <td>
                                    {/* {
                                        isAdmin && <Fab 
                                        color="secondary" 
                                        aria-label="edit"
                                        style={{ transform: 'scale(0.8)' }}
                                        onClick={() => updateOffice(office.id)}
                                        >
                                            <EditIcon/>
                                        </Fab>
                                    } */}
                                    {
                                        isAdmin && <Fab 
                                        aria-label="delete"
                                        color="error"
                                        onClick={() => handleDelete(office.id)}
                                        style={{transform: 'scale(0.8)'}}
                                        >
                                            <DeleteIcon/>
                                        </Fab>
                                    }
                                </td>
                            </tr>
                        )
                }
            </tbody>
        </table>
        <Dialog
        open={addOfficeOpen}
        onClose = {() => setAddOfficeOpen(false)}
        >
            <Button 
            color='primary'
            onClick={() => setAddOfficeOpen(false)}
            style={{marginLeft: "535px"}}
            >
                <CloseIcon/>
            </Button>
            <DialogTitle style={{textAlign: 'center'}}>ADD OFFICE</DialogTitle>
            <DialogContent dividers>
                <OfficeForm/>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default ListOfficesComponent