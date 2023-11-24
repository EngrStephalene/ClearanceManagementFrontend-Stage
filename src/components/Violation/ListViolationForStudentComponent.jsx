import React, { useEffect, useState } from 'react'
import { getStudentViolationByStudentNumber, getStudentViolations } from '../../services/ViolationService'
import { getUserId } from '../../services/AuthService'
import { Alert, AlertTitle } from '@mui/material'
import { getStudentInformation } from '../../services/StudentService';


const ListViolationForStudentComponent = () => {
    const [studentViolations, setStudentViolations] = useState([])
    const [studentInfo, setStudentInfo] = useState([])
    const userId =getUserId()
    const [studentNumber, setStudentNumber] = useState([])

    useEffect(() => {
        console.log(userId)
        studentViolationList()
    }, [])

    //FUNCTION TO FETCH STUDENT INFORMATION FROM DB
    function getStudentInfoFromDb() {
        getStudentInformation(userId).then((response) => {
            console.log(response.data)
            setStudentInfo(response.data)
            setStudentNumber(studentInfo.studentNumber)
        }).catch(err => {
            console.log(err)
        })
    }

    //FUNCTION TO FETCH STUDENT VIOLATION LIST FROM DB
    function studentViolationList() {
        // getStudentViolations(userId).then((response) => {
        //     console.log(response.data)
        //     setStudentViolations(response.data)
        // }).catch(err => {
        //     console.log(err)
        // })
        console.log(studentNumber)
        getStudentViolationByStudentNumber(studentNumber)
        .then((response) => {
            console.log(response.data)
            setStudentViolations(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    //FUNCTION TO RENDER STUDENT VIOLATIONS DYNAMICALLY
    function renderStudentViolations() {
        if(studentViolationList.length === 0) {
            console.log("GET ALL STUDENT VIOLATION IS EMPTY");
            return <Alert severity='info'>
                <AlertTitle>Info</AlertTitle>
                <strong>STUDENT HAS NO VIOLATION RECORD</strong>
            </Alert>
        } else {
            console.log("GET ALL STUDENT VIOLATION IS NOT EMPTY.");
            return <div>
                <table className='table table-bordered table-striped shadow'>
                    <thead>
                        <tr>
                            <th>Remarks</th>
                            <th>Action Item</th>
                            <th>Reporter</th>
                            <th>Status</th>
                        </tr>
                        <tbody>
                            {
                                studentViolations.map(violation => 
                                    <tr key={violation.id}>
                                        <td>{violation.description}</td>
                                        <td>{violation.actionItem}</td>
                                        <td>{violation.facultyId}</td>
                                        <td>{violation.completed ? 'RESOLVED': 'UNRESOLVED'}</td>
                                    </tr>
                                    )
                            }
                        </tbody>
                    </thead>
                </table>
            </div>
        }
    }

  return (
    <div className='ViolationListComponent'>
        <br></br>
        <h2 className='text-center'>STUDENT VIOLATIONS</h2>
        <br></br>
        {
            renderStudentViolations()
        }
    </div>
  )
}

export default ListViolationForStudentComponent