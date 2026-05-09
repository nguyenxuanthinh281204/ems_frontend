import React, { useState } from 'react'
import { createEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const [errors, setErrors] =useState({
        firstName: '',
        lastName:'',
        email:''
    })

    const navigator = useNavigate();

    const saveEmployee = (e) => {
        e.preventDefault();

        if(validateForm()){
            const employee = {firstName, lastName, email}
            console.log(employee)

            createEmployee(employee).then((response) =>{
                console.log(response.data);
                navigator('/employees');
            })
        }
        
    }

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName= '';
        } else {
            errorsCopy.firstName= "first name is required";
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName= '';
        } else {
            errorsCopy.lastName= "last name is required";
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email= "";
        } else {
            errorsCopy.email= "email is required";
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
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
                                className={`form-control ${ errors.firstName ? 'is-invalid':''}`}
                             />

                             { errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label htmlFor="" className='form-label'> Last Name</label>
                            <input 
                                type="text"
                                placeholder='Enter Employee last name'
                                name='lastName'
                                value={lastName}
                                onChange={ (e) => {setLastName(e.target.value)}}
                                className={`form-control ${ errors.lastName ? 'is-invalid':''}`}
                             />

                             { errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label htmlFor="" className='form-label'> Email</label>
                            <input 
                                type="text"
                                placeholder='Enter Employee email'
                                name='email'
                                value={email}
                                onChange={(e) => {setEmail(e.target.value)}}
                                className={`form-control ${ errors.email ? 'is-invalid':''}`}
                             />

                             { errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div> 

                        <button className='btn btn-success' onClick={saveEmployee}>Submit</button>
                    </form>
                </div>
            </div> 
        </div>

    </div>
  )
}

export default EmployeeComponent