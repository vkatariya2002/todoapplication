import React, { useEffect } from 'react';
import Header from './partials/Header';
import { useState } from "react";
import { register } from '../services/api';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Register() {
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState(null);

    const navigation = useNavigate();

    useEffect(()=>{
        const user = localStorage.getItem('user');
        if(user){
            return navigation('/')
        }  
    },[])

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async () => {

        const result = await register(form);
        if (result.status === 200) {
            if (result.data.status === 201) {
                setErrors(result.data.data);
                toast(result.data.message)
                return;
            }

            if (result.data.status === 200) {
                localStorage.setItem('user',JSON.stringify(result.data.data));
                navigation('/')
                setErrors(result.data.data);
                toast(result.data.message)
                return;
            }

            if (result.data.status === 202) {
                localStorage.setItem('user',JSON.stringify(result.data.data));
                navigation('/')
                setErrors(result.data.data);
                toast(result.data.message)
                return;
            }
        }
        else {
            toast('Something went wrong, please try again');
        }
    }





    return (
        <>
            <Header/>
            <div className='container'>
                <ToastContainer />
                <div className='row justify-content-md-center mt-4'>
                    <div className='col-lg-5 card border-primary bg-white mb-3'>
                        <div className='card-header h4 text-center'>
                            Register An Account
                        </div>
                        <div className='card-body'>

                            <div className='form-group'>
                                <label className="col-form-label mt-4">
                                    name
                                </label>
                                <input type="text"
                                    name="name"
                                    onChange={handleInputChange}
                                    className='form-control' placeholder='enter name' />

                                {errors?.name && (
                                    <small id="emailHelp" className="form-text text-danger">
                                        {errors.name.msg}
                                    </small>
                                )}
                            </div>



                            <div className='form-group'>
                                <label className="col-form-label mt-4">
                                    Username
                                </label>
                                <input type="text"
                                    name="username"
                                    onChange={handleInputChange} 
                                    className='form-control' placeholder='enter username' />


                                {errors?.username && (
                                    <small id="emailHelp" className="form-text text-danger">
                                        {errors.username.msg}
                                    </small>
                                )}
                            </div>


                            <div className='form-group'>
                                <label className="col-form-label mt-4">
                                    Email
                                </label>
                                <input type="Email"
                                    name="email"
                                    onChange={handleInputChange}
                                    className="form-control" placeholder="enter email" />


                                {errors?.email && (
                                    <small id="emailHelp" className="form-text text-danger">
                                        {errors.email.msg}
                                    </small>
                                )}
                            </div>


                            <div className='form-group'>
                                <label className="col-form-label mt-4">
                                    Password
                                </label>
                                <input type="password"
                                    name="password"
                                    onChange={handleInputChange}
                                    className='form-control' placeholder='enter Passwork' />

                                {errors?.password && (
                                    <small id="emailHelp" className="form-text text-danger">
                                        {errors.password.msg}
                                    </small>
                                )}
                            </div>

                            <div className='row justify-content-md-center 
                        form-group mt-4'>

                                <button type='button'
                                    onClick={handleSubmit}
                                    className='col-sm-6 btn btn-outline-secondary center'>
                                    Register Now
                                </button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;

