import { Typography, Grid, Paper, Button, TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { getLoggedInUser } from '../../services/AuthService'

const UpdateProfileForm = (params) => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }
    const btnStyle = { marginTop: 10 }
    const authorizedUser = getLoggedInUser()
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
        firstName: Yup.string().min(3, "Remarks too short").required("Required"),
        middleName: Yup.string().min(3, "Remarks too short").required("Required"),
        lastName: Yup.string().min(3, "Remarks too short").required("Required"),
        address: Yup.string().min(3, "Action item too short. Please be descriptive.").required("Required")
    })


    //FUNCTION TO HANDLE SUBMIT BUTTON
    const onSubmit = (values, props) => {
        console.log(authorizedUser)
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
                        required
                        error={props.errors.middleName && props.touched.middleName}
                                helperText={<ErrorMessage name='middleName' />}
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
                        name = 'email'
                        label = 'Email'
                        fullWidth
                        required
                        error={props.errors.email && props.touched.email}
                                helperText={<ErrorMessage name='email' />}
                        />
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

export default UpdateProfileForm