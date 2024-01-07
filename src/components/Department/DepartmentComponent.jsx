import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState('')
  const {id} = useParams()

  const navigator = useNavigate();

  //FUNCTION FOR SAVE DEPARTMENT OR UPDATE DEPARTMENT API
  function saveOrUpdateDept(e) {
    e.preventDefault();
    const department = {departmentName}
    console.log(department);

    //UPDATE DEPARTMENT API
    if(id) {
      console.log("Update department api is called.");

      axios.put('https://amiable-copper-production.up.railway.app/api/department/' + id, department)
      .then((response) => {
        console.log(response.data);
        //instead of navigating to department list, create message box for alert
        navigateDeptList();
      }).catch(error => {
        console.error(error);
      })

    } else { //THIS IS FOR ADD DEPARTMENT API
      console.log("Add department api is called.");

      axios.post('https://amiable-copper-production.up.railway.app/api/department/add', department)
      .then((response) => {
        console.log(response.data);
        //instead of navigating to department list, create message box for alert
        navigateDeptList();
      }).catch(error => {
        console.error(error);
      })
    }
  }

  function pageTitle() {
    if(id) {
      console.log("Update department.");
      return <h2 className='text-center'>Update Department</h2>
    } else {
      console.log("Add department.");
      return <h2 className='text-center'>Add Department</h2>
    }
  }
  
  function navigateDeptList() {
    navigator('/departments')
  }

  return (
    <div className='container'>
      <br></br><br></br>
      <div className='row'>
        <div className='card col-md-12 offset-md-3 offset-md-3'>
          { pageTitle() }
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
              <label className='form-label'>Department Name</label>
                <input
                  type='text'
                  name='departmentName'
                  placeholder='Enter department name.'
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className='form-control'
                ></input>
              </div>
              <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateDept(e)}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepartmentComponent