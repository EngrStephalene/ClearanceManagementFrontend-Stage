import { Typography, Grid, Paper, Button, TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { addFacultyHead } from '../../services/FacultyService'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FacultyHeadForm = () => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }
    const btnStyle = { marginTop: 10 }
    const cancelbtnStyle = { marginTop: 10, marginLeft: 20}

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
        gender: Yup.string().min(2, "Gender required.").required("Required"),
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
        const birthday = values.birthday;
        const gender = values.gender;
        const role = values.office;
        const faculty = {facultyNumber, email, firstName, middleName, lastName, address, role, gender, birthday};
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

    const handleClose = () => {
        window.location.reload(true)
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
                        name = 'gender'
                        label = 'Select Gender'
                        component = 'select'
                        style={{marginBottom: "15px"}}
                        required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </Field>
                        <div
                        style={{marginBottom: "15px"}}
                        >
                            <label htmlFor="birthday">Birthday:</label>
                            <br></br>
                            <Field name="birthday">
                                {({ field, form }) => (
                                <DatePicker
                                    id="birthday"
                                    {...field}
                                    selected={field.value}
                                    onChange={(birthday) => form.setFieldValue(field.name, birthday)}
                                />
                                )}
                            </Field>
                            <ErrorMessage name="date" component="div" />
                        </div>
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
                            <option value="Department Chairman">Department Chairman</option>
                            <option value="College Dean">College Dean</option>
                            <option value="School Director">College Dean</option>
                            <option disabled value="SG Adviser">SG Adviser</option>
                            <option disabled value="Campus Ministry">Campus Ministry</option>
                            <option disabled value="Guidance Office">Office of the Guidance Center</option>
                            <option disabled value="Library In-Charge">Library In-charge</option>
                            <option disabled value="Dispensary In-Charge">Dispensary In-charge</option>
                            <option disabled value="Property Custodian">Property Custodian</option>
                            <option disabled value="Prefect Of Discipline">Prefect of Discipline</option>
                            <option disabled alue="Registrar">Office of the School Registrar</option>
                            <option disabled value="Finance">Cashier / Finance Office</option>
                        </Field>
                        <br></br>
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

export default FacultyHeadForm