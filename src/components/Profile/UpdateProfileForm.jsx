import { Typography, Grid, Paper, Button, TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { getLoggedInUser, getUserId, getRole } from '../../services/AuthService'
import { updateUserProfile } from '../../services/UserService'

const UpdateProfileForm = (params) => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }
    const btnStyle = { marginTop: 10 }
    const cancelbtnStyle = { marginTop: 10, marginLeft: 20}
    const authorizedUser = getLoggedInUser()
    const authUserId = getUserId()
    const userRole = getRole()
    const {pFirstName, pMiddleName, pLastName, pAddress, pEmail} = params;

    useEffect(() => {
        console.log(pFirstName + pMiddleName + pLastName)
    }, [])

    //INITIALIZE FORM VALUES
    const initialValues = {
        firstName: pFirstName,
        middleName: pMiddleName,
        lastName: pLastName,
        address: pAddress,
        email: pEmail
    }

    //FUNCTION FOR FORM VALIDATION
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(3, "First Name too short").required("Required"),
        lastName: Yup.string().min(1, "Last Name too short").required("Required"),
        address: Yup.string().min(3, "Description too short. Please be descriptive.").required("Required")
    })


    //FUNCTION TO HANDLE SUBMIT BUTTON
    const onSubmit = (values, props) => {
        const firstName = values.firstName;
        const middleName = values.middleName;
        const lastName = values.lastName;
        const address = values.address;
        const email = values.email
        const userId = authUserId
        const role = userRole
        const request = {userId, role, firstName, middleName, lastName, address, email}
        console.log(request)
        updateUserProfile(request)
        .then((response) => {
            console.log(response.data)
            alert("Successfully updated user information.")
            window.location.reload(true)
        }).catch(err => {
            console.log(err)
            alert("There was an error while updating user profile. Please contact administrator.")
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
                <Typography variant='caption'>Fill the form to edit user information.</Typography>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <Field 
                        as={TextField}
                        name = 'firstName'
                        label = 'First Name'
                        style={{marginBottom: "15px"}}
                        fullWidth
                        required
                        error={props.errors.firstName && props.touched.firstName}
                                helperText={<ErrorMessage name='firstName' />}
                        />
                        <Field 
                        as={TextField}
                        name = 'middleName'
                        label = 'Middle Name'
                        style={{marginBottom: "15px"}}
                        fullWidth
                        />
                        <Field 
                        as={TextField}
                        name = 'lastName'
                        label = 'Last Name'
                        style={{marginBottom: "15px"}}
                        fullWidth
                        required
                        error={props.errors.lastName && props.touched.lastName}
                                helperText={<ErrorMessage name='lastName' />}
                        />
                        <Field 
                        as={TextField}
                        name = 'address'
                        label = 'Address'
                        style={{marginBottom: "15px"}}
                        fullWidth
                        required
                        error={props.errors.address && props.touched.address}
                                helperText={<ErrorMessage name='address' />}
                        />
                        <Field 
                        as={TextField}
                        type = 'email'
                        name = 'email'
                        label = 'Email'
                        style={{marginBottom: "15px"}}
                        fullWidth
                        required
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

export default UpdateProfileForm