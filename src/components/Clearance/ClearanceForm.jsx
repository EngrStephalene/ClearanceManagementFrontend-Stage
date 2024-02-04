import { Typography, Grid, Paper, Button, TextField, Alert } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { getUserId } from '../../services/AuthService'
import { addClearance } from '../../services/ClearanceService'

const ClearanceForm = () => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 250, }
    const btnStyle = { marginTop: 10 }
    const studentId = getUserId()
    const [error,setError]=useState();

    //INITIALIZE FORM VALUES
    const initialValues = {
        reason: ''
    }

    //FUNCTION FOR FORM VALIDATION
    const validationSchema = Yup.object().shape({
        purpose: Yup.string().min(3, "Please select a purpose.").required("Required")
    })


    //FUNCTION TO HANDLE ADD ANNOUNCEMENT BUTTON
    const onSubmit = (values, props) => {
        const reason = values.purpose;
        const clearance = {studentId, reason}
        console.log(clearance)
        console.log("ADD CLEARANCE API IS CALLED.")
        addClearance(clearance).then((response) => {
            console.log(response.data)
        }).catch(err => {
            setError('Invalid Username or Password')
            console.log(err)
        })
        alert("Successfully requested clearance.")
        window.location.reload(true)
        props.resetForm()
    }

  return (
    <Grid>
        <Paper elevation={0} style={paperStyle}>
            <Grid align='center'>
                <Typography variant='caption'>Fill the form to request clearance.</Typography>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        {/* <Field 
                        as={TextField}
                        name = 'reason'
                        label = 'Reason'
                        fullWidth
                        required
                        error={props.errors.reason && props.touched.reason}
                                helperText={<ErrorMessage name='reason' />}
                        /> */}
                        <Field
                        name = 'purpose'
                        label = 'Select Purpose'
                        component = 'select'
                        style={{marginTop: "15px"}}
                        error={props.errors.purpose && props.touched.purpose}
                                helperText={<ErrorMessage name='purpose' />}
                        >
                            <option value="">Select Purpose</option>
                            <option value="Mid Year">Mid Year</option>
                            <option value="Year End">Year End</option>
                            <option value="Transfer">Transfer</option>
                            <option value="Graduation">Graduation</option>
                        </Field>
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

export default ClearanceForm