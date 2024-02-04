import { Typography, Grid, Paper, Button, TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { getLoggedInUser } from '../../services/AuthService'
import { getFacultyByUsername } from '../../services/FacultyService'
import { createViolation } from '../../services/ViolationService'

const ViolationForm = (params) => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }
    const btnStyle = { marginTop: 10 }
    const addBtnStyle = { marginTop: 10, marginLeft: "25px" }
    const authorizedUser = getLoggedInUser()
    const completed = 0;
    const [faculty, setFaculty] = useState([])
    const [facultyId, setFacultyId] = useState([])

    useEffect(() => {
        getFaculty()
    }, [])

    const {studentNumber, studentFname, studentLname} = params;

    //INITIALIZE FORM VALUES
    const initialValues = {
        studentName: studentFname + " " + studentLname,
        description: '',
        actionItem: ''
    }

    //FUNCTION FOR FORM VALIDATION
    const validationSchema = Yup.object().shape({
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
    const onSubmit = (values, props) => {
        console.log(authorizedUser)
        console.log(completed)
        console.log(faculty)
        console.log(facultyId)

        const description = values.description;
        const actionItem = values.actionItem;

        const violation = {facultyId, completed, description, actionItem}

        createViolation(studentNumber, violation)

        props.resetForm()

        alert("Successful!")
        window.location.reload(true)
    }


  return (
    <Grid>
        <Paper elevation={0} style={paperStyle}>
            <Grid align='center'>
                <Typography variant='caption'>Fill the form to add violation for student.</Typography>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <Field 
                        as={TextField}
                        name = 'studentName'
                        label = 'Student Name'
                        style={{marginBottom: "15px"}}
                        fullWidth
                        required
                        InputProps={{
                            readOnly: true,
                          }}
                        />
                        {/* <Field 
                        as={TextField}
                        name = 'description'
                        label = 'Remarks'
                        style={{marginBottom: "15px"}}
                        fullWidth
                        required
                        error={props.errors.description && props.touched.description}
                                helperText={<ErrorMessage name='description' />}
                        /> */}
                        <Field
                        name = 'description'
                        label = 'Remarks'
                        component = 'select'
                        style={{marginBottom: "15px"}}
                        >
                            <option value="">Select Violation</option>
                            <option value="No ID">No ID</option>
                            <option value="No Complete Uniform">No Complete Uniform</option>
                            <option value="No haircut">No haircut</option>
                            <option value="Plagiarism">Plagiarism</option>
                            <option value="Cheating on Exams">Cheating on Exams</option>
                            <option value="Fabricating Data or Information">Fabricating Data or Information</option>
                            <option value="Forgery">Forgery</option>
                            <option value="Disruptive Behavior">Disruptive Behavior</option>
                            <option value="Drug or Alcohol Violations">Drug or Alcohol Violations</option>
                            <option value="Violations of Computer Use Policies">Violations of Computer Use Policies</option>
                        </Field>
                        <Field 
                        as={TextField}
                        name = 'actionItem'
                        label = 'Action/Resolution'
                        fullWidth
                        required
                        error={props.errors.actionItem && props.touched.actionItem}
                                helperText={<ErrorMessage name='actionItem' />}
                        />
                        <Button 
                        type='submit' style={btnStyle} 
                        variant='contained'
                        color='primary'>
                            Submit
                        </Button>
                        <Button 
                        onClick={handleAddViolationButton(values,props)} 
                        style={addBtnStyle} 
                        variant='contained'
                        color='secondary'>
                            Add
                        </Button>
                    </Form>
                )}
            </Formik>
        </Paper>
    </Grid>
  )
}

export default ViolationForm