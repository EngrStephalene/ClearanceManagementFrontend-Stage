import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getAllDepartment } from '../../services/DepartmentService'
import { useParams } from 'react-router-dom'
import { updateSubject } from '../../services/SubjectService'

const SubjectComponent = () => {
  const[subjectName, setSubjectName] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [departments, setDepartments] = useState([])
  const {id} = useParams()

  const[errors, setErrors] = useState({
    subjectName: '',
    department: ''
  })

  useEffect(() => {
    departmentList();
  }, [])

  function departmentList() {
      getAllDepartment().then((response) => {
          setDepartments(response.data);
          console.log(response.data);
      }).catch(error => {
          console.error(error);
      })
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = {... errors}
    console.log("Selected dept" + departmentId);
    if(subjectName){
      errorsCopy.subjectName = ''
    } else {
      errorsCopy.subjectName = 'Input Subject Name'
      valid = false
    }
    if(departmentId){
      errorsCopy.department = ''
    }else {
      errorsCopy.department = 'Select Department'
      valid = false
    }

    setErrors(errorsCopy);
    
    return valid;
  }

  function saveOrUpdateSubject(e) {
    e.preventDefault();

    const subj = {subjectName, departmentId}

    if(id) {
      if(validateForm()) {
        console.log("UPDATE SUBJECT API IS CALLED.");
        console.log(subj);
        updateSubject(subj,id)
        .then((response) => {
          console.log(response.data);
          // <Alert severity="success">Successfully updated subject information.</Alert> //TO CHANGE TO POP UP MESSAGE
        }).catch(error => {
          console.log(error);
          // <Alert severity="error">Error updating subject information. Please contact administrator.</Alert> //TO CHANGE TO POP UP MESSAGE
        })
      }
    } else {
      if(validateForm()) {
        console.log("ADD SUBJECT API IS CALLED.");
        console.log(subj);
        axios.post('https://amiable-copper-production.up.railway.app/api/subject/add-subj', subj)
        .then((response) => {
          console.log(response.data);
          alert("Successfully added subject.");
        }).catch(error => {
          console.log(error);
          alert("Error adding subject.");
        })
      }
    }
  }

  return (
    <>
      <div className='container'>
      <br></br><br></br>
        <div className='row'>
          <div className='card col-md-12 offset-md-3 offset-md-3'>
          <h2 className='text-center'>Add Subject</h2>
            <div className='card-body'>
              <form>
                <div className='form-group mb-2'>
                <label className='form-label'>Subject Name:</label>
                  <input
                      type='text'
                      placeholder='Enter Employee First Name'
                      name='subjectName'
                      value={subjectName}
                      className={`form-control ${ errors.subjectName ? 'is-invalid': '' }`}
                      onChange={(e) => setSubjectName(e.target.value)}
                    >
                    </input>
                    { errors.subjectName && <div className='invalid-feedback'> { errors.subjectName} </div> }
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Select Department</label>
                  <select 
                    className={`form-control ${ errors.department ? 'is-invalid': '' }`}
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    >
                      <option>
                        Select Department
                      </option>

                      {
                        departments.map(department =>
                          <option key={department.id} value={department.id}> {department.departmentName} </option>
                          )
                      }
                    </select>
                    { errors.department && <div className='invalid-feedback'> { errors.department} </div> }
                </div>
                <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateSubject(e)}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubjectComponent