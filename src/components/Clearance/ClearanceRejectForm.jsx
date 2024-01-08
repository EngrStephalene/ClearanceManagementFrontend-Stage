import { Typography, Grid, Paper, Button, TextField, Alert } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { getUserId } from '../../services/AuthService'
import { addClearance, markClearanceAsReject } from '../../services/ClearanceService'

const ClearanceRejectForm = (params) => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 250, }
    const btnStyle = { marginTop: 10 }
    const{id} = params;

    const [error,setError]=useState();

    //INITIALIZE FORM VALUES
    const initialValues = {
        remarks: ''
    }

    //FUNCTION FOR FORM VALIDATION
    const validationSchema = Yup.object().shape({
        remarks: Yup.string().min(3, "Remarks too short").required("Required")
    })


    //FUNCTION TO HANDLE REJECT CLEARANCE BUTTON
    const onSubmit = (values, props) => {
        const remarks = values.remarks;
        console.log("REJECT CLEARANCE API IS CALLED.")
        console.log("Clearance ID: " + id)
        console.log("REMARKS: " + remarks)
        const rejectClearance = {id, remarks}
        markClearanceAsReject(rejectClearance).then((response) => {
            console.log(response.data)
            window.location.reload(true)
        }).catch(err => {
            console.log(err)
            setError('There was an error while rejecting clearace. Kindly contact admin for support.')
        })
        props.resetForm()
    }

  return (
    <Grid>
        <Paper elevation={0} style={paperStyle}>
            {error?<Alert severity="error">{error}</Alert>:null}
            <Grid align='center'>
                <Typography variant='caption'>Fill the form to reject clearance.</Typography>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <Field 
                        as={TextField}
                        name = 'remarks'
                        label = 'Remarks'
                        fullWidth
                        required
                        error={props.errors.remarks && props.touched.remarks}
                                helperText={<ErrorMessage name='remarks' />}
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

export default ClearanceRejectForm