import { Typography, Grid, Paper, Button, TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'

const SubjectForm = () => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 250, }
    const btnStyle = { marginTop: 10 }
    const cancelbtnStyle = { marginTop: 10, marginLeft: 20}

    //INITIALIZE FORM VALUES
    const initialValues = {
        subjectName: ''
    }

    //FUNCTION FOR FORM VALIDATION
    const validationSchema = Yup.object().shape({
        subjectName: Yup.string().min(3, "Subject Name too short").required("Required")
    })


    //FUNCTION TO HANDLE ADD ANNOUNCEMENT BUTTON
    const onSubmit = (values, props) => {
        console.log("ADD SUBJECT API IS CALLED.");
        console.log(values);
        axios.post('http://localhost:8080/api/subject/add-subj', values)
        .then((response) => {
          console.log(response.data);
          alert("Successfully added subject.");
          window.location.reload(true)
        }).catch(error => {
          console.log(error);
          alert("Error adding subject.");
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
                <Typography variant='caption'>Fill the form to subject department.</Typography>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <Field 
                        as={TextField}
                        name = 'subjectName'
                        label = 'Subject Name'
                        fullWidth
                        required
                        error={props.errors.subjectName && props.touched.subjectName}
                                helperText={<ErrorMessage name='subjectName' />}
                        />
                        <Field
                        name = 'department'
                        label = 'Select Department'
                        component = 'select'
                        style={{marginTop: "15px"}}
                        >
                            <option value="">Select Department</option>
                            
                        </Field>
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

export default SubjectForm