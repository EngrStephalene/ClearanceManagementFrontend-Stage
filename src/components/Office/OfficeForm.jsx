import { Typography, Grid, Paper, Button, TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { getLoggedInUser } from '../../services/AuthService'
import { getFacultyByUsername } from '../../services/FacultyService'
import { addOffice } from '../../services/OfficeService'

const OfficeForm = () => {
    const paperStyle = { padding: '0 15px 40px 15px', width: 450, }
    const btnStyle = { marginTop: 10 }
    const authorizedUser = getLoggedInUser()

    //INITIALIZE FORM VALUES
    const initialValues = {
        name: ''
    }

    //FUNCTION FOR FORM VALIDATION
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Office name too short").required("Required")
    })

    //FUNCTION TO HANDLE ADD ANNOUNCEMENT BUTTON
    const onSubmit = (values, props) => {
        console.log(authorizedUser)
        console.log(values.name)

        const name = values.name
        const isOfficeHeadAssigned = 0
        const request = {name, isOfficeHeadAssigned}

        addOffice(request).then((response) => {
            console.log(response)
            alert("Successful!")
            props.resetForm()
            window.location.reload(true)
        }).catch(err => {
            console.log(err)
            alert("There was an error while adding office. Kindly contact admin.")
            props.resetForm()
            window.location.reload(true)
        })
    }

  return (
    <Grid>
        <Paper elevation={0} style={paperStyle}>
            <Grid align='center'>
                <Typography variant='caption'>Fill the form to add office.</Typography>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <Field 
                        as={TextField}
                        name = 'name'
                        label = 'Office Name'
                        style={{marginBottom: "15px"}}
                        fullWidth
                        error={props.errors.name && props.touched.name}
                                helperText={<ErrorMessage name='name' />}
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

export default OfficeForm