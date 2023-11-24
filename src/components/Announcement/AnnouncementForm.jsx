import React from 'react'
import { Grid, Paper, Button, Typography, TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { addAnnouncement } from '../../services/AnnouncementService'

const AnnouncementForm = () => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 250, }
    const btnStyle = { marginTop: 10 }

    //INITIALIZE FORM VALUES
    const initialValues = {
        title: '',
        description: '',
        details: ''
    }

    //FUNCTION FOR FORM VALIDATION
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(5, "Title too short").required("Required"),
        description: Yup.string().min(5, "Description too short").required("Required"),
        details: Yup.string().min(5, "Details too short").required("Required")
    })

    //FUNCTION TO HANDLE ADD ANNOUNCEMENT BUTTON
    const onSubmit = (values, props) => {
        console.log("ADD ANNOUNCEMENT SUBMIT BUTTON IS CLICKED.")
        // alert(JSON.stringify(values), null, 2)
        addAnnouncement(values).then((response) => {
            console.log(response)
            alert("Successfully added announcement.")
            window.location.reload(true)
        }).catch(error => {
            console.log(error)
        })
        
        props.resetForm()
    }

  return (
    <Grid>
        <Paper elevation={0} style={paperStyle}>
            <Grid align='center'>
                <Typography variant='caption'>Fill the form to add an announcement.</Typography>
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
                        as={TextField}
                        name = 'description'
                        label = 'Description'
                        style={{marginBottom: "15px"}}
                        error={props.errors.description && props.touched.description}
                                helperText={<ErrorMessage name='description' />}
                        fullWidth
                        required/>
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
                    </Form>
                )}
            </Formik>
        </Paper>
    </Grid>
  )
}

export default AnnouncementForm