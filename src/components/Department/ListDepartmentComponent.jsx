import React, { useEffect, useState } from 'react'
import { deleteDepartment, getAllDepartment } from '../../services/DepartmentService'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Department.css'
import SearchIcon from '@mui/icons-material/Search';
import { Fab, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigationIcon from '@mui/icons-material/Navigation';
import DepartmentForm from './DepartmentForm';
import CloseIcon from '@mui/icons-material/Close';
import { isAdminUser } from '../../services/AuthService';

const ListDepartmentComponent = () => {
  const [departments, setDepartments] = useState([])
  const navigator = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [addDeptDialogOpen, setAddDeptOpen] = useState(false);
  const adminUser = isAdminUser();

    useEffect(() => {
        departmentList();
    }, [])

    //FUNCTION TO DISPLAY DEPARTMENT LIST FROM GET ALL DEPARTMENT API
    function departmentList() {
        getAllDepartment().then((response) => {
            setDepartments(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log("error" + error);
        })
    }

    //FUNCTION FOR UPDATE DEPARTMENT BUTTON
    function updateDepartment(id) {
      navigator(`/update-department/${id}`)
    }

    //FUNCTION FOR VIEW SUBJECT BY DEPARTMENT ID BUTTON
    function viewSubjects() {
        navigator(`/subjects`)
    }

    //FUNCTION FOR DELETE DEPARTMENT API (STILL NOT WORKING, NEED TO DEBUG)
    function handleDelete(id) {
        console.log("DELETE DEPARTMENT BUTTON IS CLICKED.")
        deleteDepartment(id)
        .then((response) => {
            console.log("DELETED RECORD " + response)
            alert("Successfully deleted department.") //TODO CHANGE TO POP UP MESSAGE IN THE CENTER
            window.location.reload(true)
        }).catch(error => {
            console.log(error)
        })
    }

    //FUNCTION TO HANDLE ADD DEPARTMENT BUTTON
    function handleAddDeptButton() {
        console.log("ADD DEPARTMENT BUTTON IS CLICKED.");
        setAddDeptOpen(true)
        // navigator('/add-department')
    }

  return (
     <div className='DepartmentListComponent'>
        <div className="input-group rounded">
        <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
        <span className="input-group-text border-0" id="search-addon">
            <SearchIcon/>
        </span>
        </div>
        <br></br>
        <h2 className='text-center'>LIST OF DEPARTMENTS</h2>
        <br></br>
        {
            adminUser && 
            <Button onClick={handleAddDeptButton} variant="outlined" startIcon={<AddIcon />}>
            ADD DEPARTMENT
            </Button>
        }
        <br></br><br></br>
        <table className='table table-striped table-bordered shadow'>
            <thead>
                <tr>
                    <th>Department Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    departments.map( department => 
                            <tr key={department.id}>
                                <td> {department.departmentName} </td>
                                <td>
                                    <Fab
                                    onClick={() => updateDepartment(department.id)}
                                    color="secondary" 
                                    aria-label="edit"
                                    >
                                        <EditIcon/>
                                    </Fab>
                                    <Fab
                                    onClick={() => handleDelete(department.id)}
                                    style={{marginLeft: "10px"}}
                                    aria-label="delete"
                                    color="error"
                                    >
                                        <DeleteIcon/>
                                    </Fab>
                                    <Fab
                                    onClick={() => viewSubjects()}
                                    color='info' 
                                    variant="extended"
                                    style={{marginLeft: "10px"}}
                                    >
                                        <NavigationIcon sx={{ mr: 1 }} />
                                        View Subjects
                                    </Fab>
                                    {/* <button onClick={() => updateDepartment(department.id)} className='btn btn-info'>Update</button> */}
                                    {/* <button onClick={() => handleDelete(department.id)} className='btn btn-danger'
                                        style={{marginLeft: "10px"}}>
                                            Delete
                                    </button> */}
                                    {/* <button onClick={() => viewSubjects()} 
                                    className='btn btn-info'
                                    style={{marginLeft: "10px"}}>
                                        View Subjects
                                    </button> */}
                                </td>
                            </tr>
                        )
                }
            </tbody>
        </table>
        <Dialog
        open={addDeptDialogOpen}
        onClose = {() => setAddDeptOpen(false)}
        >
            <Button 
            color='primary'
            onClick={() => setAddDeptOpen(false)}
            style={{marginLeft: "235px"}}
            >
                <CloseIcon/>
            </Button>
            <DialogTitle>ADD DEPARTMENT</DialogTitle>
            <DialogContent dividers>
                <DepartmentForm/>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default ListDepartmentComponent