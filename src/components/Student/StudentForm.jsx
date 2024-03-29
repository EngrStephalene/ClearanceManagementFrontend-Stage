import { Typography, Grid, Paper, Button, TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { addStudent } from '../../services/StudentService'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StudentForm = () => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }
    const btnStyle = { marginTop: 10 }
    const cancelbtnStyle = { marginTop: 10, marginLeft: 20}
      
    //INITIALIZE FORM VALUES
    const initialValues = {
        studentId: '',
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        address: '',
        course: ''
    }

    //FUNCTION FOR FORM VALIDATION
    const validationSchema = Yup.object().shape({
        firstname: Yup.string().min(3, "First Name too short").required("Required"),
        lastname: Yup.string().min(2, "Last Name too short").required("Required"),
        gender: Yup.string().min(2, "Gender required.").required("Required"),
        yearLevel: Yup.string().min(1, "Gender required.").required("Required"),
        address: Yup.string().min(3, "Address too short.").required("Required"),
        email: Yup.string().email('Invalid email').required('Required')
    })

    //FUNCTION TO HANDLE SUBMIT FORM
    const onSubmit = (values,props) => {
        console.log("Submit button is clicked.")
        const studentNumber = values.studentId;
        const firstName = values.firstname;
        const middleName = values.middlename;
        const lastName = values.lastname;
        const gender = values.gender;
        const email = values.email;
        const address = values.address;
        const birthday = values.birthday;
        const yearLevel = values.yearLevel
        const course = values.course
        const student = {studentNumber, firstName, middleName, lastName, email, address, birthday, yearLevel, gender, course}
        console.log(student)
        // addStudent(student)
        // .then((response) => {
        //     console.log(response.data)
        //     alert("Success")
        //     window.location.reload(true)
        // }).catch(err => {
        //     console.log(err)
        // })
        props.resetForm()
    }

    const handleClose = () => {
        window.location.reload(true)
    }

  return (
    <Grid>
        <Paper elevation={0} style={paperStyle}>
            <Grid align='center'>
                <Typography variant='caption'>Fill the form add student.</Typography>
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
                        name = 'gender'
                        label = 'Select Gender'
                        component = 'select'
                        style={{marginBottom: "15px"}}
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
                                helperText={<ErrorMessage name='email' />}
                        />
                        <Field
                        name = 'yearLevel'
                        label = 'Select Year Level'
                        component = 'select'
                        style={{marginTop: "15px", marginBottom: "15px"}}
                        >
                            <option value="">Select Year Level</option>
                            <option value="First">I</option>
                            <option value="Second">II</option>
                            <option value="Third">III</option>
                            <option value="Fourth">IV</option>
                        </Field>
                        <Field 
                        as={TextField}
                        name = 'course'
                        label = 'Course'
                        fullWidth
                        required
                        tyle={{marginTop: "15px"}}
                        error={props.errors.course && props.touched.course}
                                helperText={<ErrorMessage name='course' />}
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

export default StudentForm