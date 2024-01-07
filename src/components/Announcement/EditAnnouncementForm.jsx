import React, { useEffect, useState } from 'react'
import { Grid, Paper, Button, Typography, TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { addAnnouncement, editAnnouncement } from '../../services/AnnouncementService'

const EditAnnouncementForm = (params) => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 250, }
    const btnStyle = { marginTop: 10 }
    const cancelbtnStyle = { marginTop: 10, marginLeft: 20}
    const {pId, pReportedDate, pTitle, pDetails} = params

    useEffect(() => {
        console.log(pId + pReportedDate)
    }, [])

    //INITIALIZE FORM VALUES
    const initialValues = {
        title: pTitle,
        details: pDetails
    }

    //FUNCTION FOR FORM VALIDATION
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(5, "Title too short").required("Required"),
        details: Yup.string().min(5, "Details too short").required("Required")
    })

    //FUNCTION TO HANDLE ADD ANNOUNCEMENT BUTTON
    const onSubmit = (values, props) => {
        console.log("EDIT ANNOUNCEMENT SUBMIT BUTTON IS CLICKED.")
        const id = pId
        const title = values.title
        const description = values.details
        const request = {id, title, description}
        console.log(request)
        editAnnouncement(request).then((response) => {
            console.log(response)
            alert("Successfully added announcement.")
            window.location.reload(true)
        }).catch(error => {
            console.log(error)
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
                {/* <Typography variant='caption'>Fill the form to edit an announcement.</Typography> */}
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <Field 
                        as={TextField}
                        name = 'title'
                        label = 'Announcement Title'
                        fullWidth
                        required
                        style={{marginBottom: "15px"}}
                        error={props.errors.title && props.touched.title}
                                helperText={<ErrorMessage name='title' />}
                        />
                        <Field
                        as = {TextField}
                        name = 'details'
                        label = 'Details'
                        style={{marginBottom: "15px"}}
                        error={props.errors.details && props.touched.details}
                                helperText={<ErrorMessage name='details' />}
                        fullWidth/>
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

export default EditAnnouncementForm