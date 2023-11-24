import { Typography, Grid, Paper, Button, TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { addFacultyHead } from '../../services/FacultyService'

const FacultyHeadForm = () => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }
    const btnStyle = { marginTop: 10 }

     //INITIALIZE FORM VALUES
     const initialValues = {
        facultyId: '',
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        address: '',
        office: ''
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
        const facultyNumber = values.facultyId;
        const firstName = values.firstname;
        const middleName = values.middlename;
        const lastName = values.lastname;
        const email = values.email;
        const address = values.address;
        const role = values.office;
        const faculty = {facultyNumber, email, firstName, middleName, lastName, address, role};
        console.log(faculty)
        addFacultyHead(faculty)
        .then((response) => {
            console.log(response.data)
        }).catch(err => {
            console.log(err)
        })
        alert("Successfully added faculty head.")
        window.location.reload(true)
        props.resetForm()
    }

  return (
    <Grid>
        <Paper elevation={0} style={paperStyle}>
            <Grid align='center'>
                <Typography variant='caption'>Fill the form add faculty head.</Typography>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <Field 
                        as={TextField}
                        name = 'facultyId'
                        label = 'Faculty ID'
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
                        <Field
                        name = 'office'
                        label = 'Select Office'
                        component = 'select'
                        style={{marginTop: "15px"}}
                        >
                            <option value="">Select Office</option>
                            <option value="treasurer">Department Treasurer</option>
                            <option value="chairman">Department Chairman</option>
                            <option value="sgAdviser">SG Adviser</option>
                            <option value="campusMinistry">Campus Ministry</option>
                            <option value="guidanceOffice">Office of the Guidance Center</option>
                            <option value="libraryIncharge">Library In-charge</option>
                            <option value="dispensaryIncharge">Dispensary In-charge</option>
                            <option value="propertyCustodian">Property Custodian</option>
                            <option value="prefectOfDiscipline">Prefect of Discipline</option>
                            <option value="schoolRegistrar">Office of the School Registrar</option>
                            <option value="finance">Cashier / Finance Office</option>
                        </Field>
                        <br></br>
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

export default FacultyHeadForm