import { Typography, Grid, Paper, Button, TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { updateStudent } from '../../services/StudentService'

const UpdateStudentForm = (params) => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }
    const btnStyle = { marginTop: 10 }
    const cancelbtnStyle = { marginTop: 10, marginLeft: 20}
    const {pUserId, pFirstName, pMiddleName, pLastName, pStudentNumber, pEmail, pAddress} = params;

    //INITIALIZE FORM VALUES
    const initialValues = {
        studentId: pStudentNumber,
        firstname: pFirstName,
        middlename: pMiddleName,
        lastname: pLastName,
        email: pEmail,
        address: pAddress
    }

    //FUNCTION FOR FORM VALIDATION
    const validationSchema = Yup.object().shape({
        firstname: Yup.string().min(3, "Remarks too short").required("Required"),
        lastname: Yup.string().min(3, "Remarks too short").required("Required"),
        address: Yup.string().min(3, "Action item too short. Please be descriptive.").required("Required")
    })

    //FUNCTION TO HANDLE SUBMIT FORM
    const onSubmit = (values,props) => {
        console.log("Submit button is clicked.")
        console.log(pUserId)
        const userId = pUserId
        const studentNumber = values.studentId;
        const firstName = values.firstname;
        const middleName = values.middlename;
        const lastName = values.lastname;
        const email = values.email;
        const address = values.address;
        const request = {userId, studentNumber, firstName, middleName, lastName, email, address}
        console.log(request)
        updateStudent(request)
        .then((response) => {
            console.log(response.data)
            alert("Successfully updated student information.")
            window.location.reload(true)
        }).catch(err => {
            console.log(err)
            alert("There was an error while updating student information. Kindly contact administrator.")
            window.location.reload(true)
        })
        props.resetForm()
    }

    const handleClose = () => {
        window.location.reload(true)
    }

  return (
    <Grid>
        <Paper elevation={0} style={paperStyle}>
            <Grid align='center'>
                <Typography variant='caption'>Fill the form update student.</Typography>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <Field 
                        as={TextField}
                        name = 'studentId'
                        label = 'Student ID'
                        style={{marginBottom: "15px"}}
                        fullWidth
                        required
                        
                        />
                        <Field 
                        as={TextField}
                        name = 'firstname'
                        label = 'First Name'
                        style={{marginBottom: "15px"}}
                        fullWidth
                        required
                        error={props.errors.firstname && props.touched.firstname}
                                helperText={<ErrorMessage name='firstname' />}
                        />
                        <Field 
                        as={TextField}
                        name = 'middlename'
                        label = 'Middle Name'
                        style={{marginBottom: "15px"}}
                        fullWidth
                        />
                        <Field 
                        as={TextField}
                        name = 'lastname'
                        label = 'Last Name'
                        style={{marginBottom: "15px"}}
                        fullWidth
                        required
                        error={props.errors.lastname && props.touched.lastname}
                                helperText={<ErrorMessage name='lastname' />}
                        />
                        <Field 
                        as={TextField}
                        name = 'email'
                        label = 'Email'
                        fullWidth
                        required
                        error={props.errors.email && props.touched.email}
                                helperText={<ErrorMessage name='actionItem' />}
                        />
                        <Field 
                        as={TextField}
                        name = 'address'
                        label = 'Address'
                        fullWidth
                        required
                        error={props.errors.address && props.touched.address}
                                helperText={<ErrorMessage name='address' />}
                        style={{marginTop: "15px"}}
                        />
                        <Button 
                        type='submit' style={btnStyle} 
                        variant='contained'
                        color='primary'>
                            Submit
                        </Button>
                        <Button 
                            onClick={handleClose}
                            variant='contained'
                            color = 'error'
                            style={cancelbtnStyle}
                            >
                            Cancel
                        </Button>
                    </Form>
                )}
            </Formik>
        </Paper>
    </Grid>
  )
}

export default UpdateStudentForm