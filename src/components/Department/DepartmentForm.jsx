import { Typography, Grid, Paper, Button, TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { addDepartment } from '../../services/DepartmentService'

const DepartmentForm = () => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 250, }
    const btnStyle = { marginTop: 10 }
    const cancelbtnStyle = { marginTop: 10, marginLeft: 20}

    //INITIALIZE FORM VALUES
    const initialValues = {
        departmentName: ''
    }

    //FUNCTION FOR FORM VALIDATION
    const validationSchema = Yup.object().shape({
        departmentName: Yup.string().min(3, "Department Name too short").required("Required")
    })


    //FUNCTION TO HANDLE ADD ANNOUNCEMENT BUTTON
    const onSubmit = (values, props) => {
        console.log("ADD DEPARTMENT API IS CALLED.")
        addDepartment(values)
        .then((response) => {
          console.log(response.data);
          //instead of navigating to department list, create message box for alert
          alert("Successfully created department.")
          window.location.reload(true)
        }).catch(error => {
          console.error(error);
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
                <Typography variant='caption'>Fill the form to add department.</Typography>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <Field 
                        as={TextField}
                        name = 'departmentName'
                        label = 'Department Name'
                        fullWidth
                        required
                        error={props.errors.departmentName && props.touched.departmentName}
                                helperText={<ErrorMessage name='departmentName' />}
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

export default DepartmentForm