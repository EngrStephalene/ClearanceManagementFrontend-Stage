import { Typography, Grid, Paper, Button, TextField, Alert } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { updateViolation } from '../../services/ViolationService'

const UpdateViolationForm = (params) => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }
    const btnStyle = { marginTop: 10 }
    const{violationId, facultyId, studentId, studentName, violationDescription, violationActionItem} = params;
    const [error,setError]=useState();

    //INITIALIZE FORM VALUES
    const initialValues = {
        studentName: studentName,
        description: violationDescription,
        actionItem: violationActionItem
    }

    //FUNCTION FOR FORM VALIDATION
    const validationSchema = Yup.object().shape({
        description: Yup.string().min(3, "Remarks too short").required("Required"),
        actionItem: Yup.string().min(3, "Action item too short. Please be descriptive.").required("Required")
    })

    const onSubmit = (values,props) => {
        const description = values.description;
        const actionItem = values.actionItem;
        const violation = {facultyId, studentId, description, actionItem}
        
        updateViolation(violationId, violation)
        .then((response) => {
            console.log(response.data)
            alert("Successfully updated violation.")
            window.location.reload(true)
        }).catch(err => {
            console.log(err)
            setError('There was an error while updating violation. Kindly contact admin for support.')
            window.location.reload(true)
        })

        props.resetForm()
    }

    return (
    <Grid>
        <Paper elevation={0} style={paperStyle}>
            {error?<Alert severity="error">{error}</Alert>:null}
            <Grid align='center'>
                <Typography variant='caption'>Fill the form to update violation for student.</Typography>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <Field 
                        as={TextField}
                        name = 'studentName'
                        label = 'Student Name'
                        style={{marginBottom: "15px"}}
                        fullWidth
                        required
                        InputProps={{
                            readOnly: true,
                          }}
                        />
                        <Field 
                        as={TextField}
                        name = 'description'
                        label = 'Remarks'
                        style={{marginBottom: "15px"}}
                        fullWidth
                        required
                        error={props.errors.description && props.touched.description}
                                helperText={<ErrorMessage name='description' />}
                        />
                        <Field 
                        as={TextField}
                        name = 'actionItem'
                        label = 'Action Item'
                        fullWidth
                        required
                        error={props.errors.actionItem && props.touched.actionItem}
                                helperText={<ErrorMessage name='actionItem' />}
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

export default UpdateViolationForm