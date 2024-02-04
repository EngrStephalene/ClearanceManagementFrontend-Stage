import { Typography, Grid, Paper, Button, TextField, Alert } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { getLoggedInUser } from '../../services/AuthService'
import { getFacultyByUsername } from '../../services/FacultyService'
import { createViolation } from '../../services/ViolationService'

const AddViolationForm = () => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }
    const btnStyle = { marginTop: 10 }
    const authorizedUser = getLoggedInUser()
    const completed = 0;
    const [faculty, setFaculty] = useState([])
    const [facultyId, setFacultyId] = useState([])
    const [error,setError]=useState();
    const [success,setSuccess]=useState();


    useEffect(() => {
        getFaculty()
    }, [])

    //INITIALIZE FORM VALUES
    const initialValues = {
        studentID: '',
        description: '',
        actionItem: ''
    }

    //FUNCTION FOR FORM VALIDATION
    const validationSchema = Yup.object().shape({
        studentID: Yup.string().min(2, "Please type minimum required ID.").required("Required"),
        description: Yup.string().min(3, "Remarks too short").required("Required"),
        actionItem: Yup.string().min(3, "Action item too short. Please be descriptive.").required("Required")
    })

    //FUNCTION TO GET FACULTY/REPORTER OF VIOLATION
    function getFaculty() {
        getFacultyByUsername(authorizedUser).then((response) => {
            setFaculty(response.data)
            setFacultyId(response.data.id)
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    //FUNCTION TO HANDLE ADD ANNOUNCEMENT BUTTON
    const onSubmit = async (values, props) => {
        console.log(authorizedUser)
        console.log(completed)
        console.log(faculty)
        console.log(facultyId)

        const studentNumber = values.studentID
        const description = values.description;
        const actionItem = values.actionItem;
        const violation = {facultyId, completed, description, actionItem}
        console.log(studentNumber)
        console.log(violation)
        
        // await createViolation(studentNumber,violation)
        // .then((response) => {
        //   console.log(response.data);
        //   props.resetForm()
        // })

        createViolation(studentNumber, violation)
        props.resetForm()

        
    }

  return (
    <Grid>
        <Paper elevation={0} style={paperStyle}>
            <Grid align='center'>
                <Typography variant='caption'>Fill the form to add violation.</Typography>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <Field 
                        as={TextField}
                        name = 'studentID'
                        label = 'Student ID'
                        style={{marginBottom: "15px"}}
                        fullWidth
                        required
                        error={props.errors.studentID && props.touched.studentID}
                                helperText={<ErrorMessage name='studentID' />}
                        />
                        <Field 
                        as={TextField}
                        name = 'description'
                        label = 'Remarks'
                        style={{marginBottom: "15px"}}
                        fullWidth
                        required
                        error={props.errors.description && props.touched.description}
                                helperText={<ErrorMessage name='description' />}
                        />
                        <Field 
                        as={TextField}
                        name = 'actionItem'
                        label = 'Action/Resolution'
                        fullWidth
                        required
                        error={props.errors.actionItem && props.touched.actionItem}
                                helperText={<ErrorMessage name='actionItem' />}
                        />
                        {error?<Alert severity="error">{error}</Alert>:null}
                        {success?<Alert severity="success">{success}</Alert>:null}
                        <Button 
                        type='submit' style={btnStyle} 
                        variant='contained'
                        color='primary'>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </Paper>
    </Grid>
  )
}

export default AddViolationForm