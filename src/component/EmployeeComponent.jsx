import React, { useState } from 'react'
import { createEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const navigator = useNavigate();

    const saveEmployee = (e) => {
        e.preventDefault();
        const employee = {firstName, lastName, email}
        console.log(employee)

        createEmployee(employee).then((response) =>{
            console.log(response.data);
            navigator('/employees');
        })
    }

    function cancel(){
        
    }
  return (
    
    <div className='container'>
        <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h2 className='text-center'>Add Employee</h2>
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'> First Name</label>
                            <input 
                                type="text"
                                placeholder='Enter Employee first name'
                                name='firstName'
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value)}}
                                className='form-control'
                             />
                        </div>

                        <div className='form-group mb-2'>
                            <label htmlFor="" className='form-label'> Last Name</label>
                            <input 
                                type="text"
                                placeholder='Enter Employee last name'
                                name='lastName'
                                value={lastName}
                                onChange={ (e) => {setLastName(e.target.value)}}
                                className='form-control'
                             />
                        </div>

                        <div className='form-group mb-2'>
                            <label htmlFor="" className='form-label'> Email</label>
                            <input 
                                type="text"
                                placeholder='Enter Employee email'
                                name='email'
                                value={email}
                                onChange={(e) => {setEmail(e.target.value)}}
                                className='form-control'
                             />
                        </div> 

                        <button className='btn btn-success' onClick={saveEmployee}>Submit</button>
                        <button className='btn btn-danger' onClick={cancel}>Cancel</button>
                    </form>
                </div>
            </div> 
        </div>

    </div>
  )
}

export default EmployeeComponent