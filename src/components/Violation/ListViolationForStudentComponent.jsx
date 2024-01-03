import React, { useEffect, useState } from 'react'
import { getStudentViolations } from '../../services/ViolationService'
import { getUserId } from '../../services/AuthService'
import { Alert, AlertTitle } from '@mui/material'
import { getStudentInformation,  getStudentNumberByUserId} from '../../services/StudentService';


const ListViolationForStudentComponent = () => {
    const [studentViolations, setStudentViolations] = useState([])
    const userId =getUserId()
    const [studentNumber, setStudentNumber] = useState([])

    useEffect(() => {
        console.log(userId)
        studentViolationList()
    }, [])

    //FUNCTION TO FETCH STUDENT VIOLATION LIST FROM DB
    function studentViolationList() {
        console.log("userId: " + userId)
        getStudentNumberByUserId(userId).then((response) => {
            console.log(response.data)
            setStudentNumber(response.data)
        }).catch(err => {
            console.log(err)
        })

        console.log(studentNumber)
        getStudentViolations(studentNumber)
            .then((res) => {
                console.log(res.data)
                setStudentViolations(res.data)
            }).catch(error => {
                console.log(error)
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