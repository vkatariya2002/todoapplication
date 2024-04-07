import React, { useEffect, useState } from 'react';
import Header from './partials/Header';
import { login } from '../services/api';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Login() {
    const navigation = useNavigate();
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigation("/")
        }
    }, []);

    const [errors, setErrors] = useState(null);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        console.log(form);
        const result = await login(form);
        console.log("form", result);
        setErrors(null);

        if (result.status === 200) {
            if (result.data.status === 200) {
                localStorage.setItem("user", JSON.stringify(result.data.data));
                navigation("/")
                return;
            }
            if (result.data.status === 201) {
                toast(result.data.message);
                setErrors(result.data.data);
                return;
            }
            if (result.data.status === 202) {
                console.log("sdfs");
                toast(result.data.message);
                return;
            }
        }
    };

    return (
    <>
        <Header/>
        <div className='container'>
        <ToastContainer/>
            <div className='row justify-content-center mt-4'>
                <div className='.col-lg-5 card border-primary bg-white mt-4'>
                    <div className="card-body">
                        <h4 className="card-title">Login Now</h4>
                        <div>
                            <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                                Email or Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email or username"
                                fdprocessedid="emweh7"
                                onChange={handleChange}
                            />
                            {errors?.username && (

                            <small id="emailHelp" className="form-text text-muted">
                                We'll never share your email with anyone else.
                            </small>
                            )}
                        </div>

                        <div className='form-group'>
                            <label htmlFor="exampleInputPassword1" className="form-label mt-4">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                autoComplete="off"
                                fdprocessedid="ukouyq"
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            fdprocessedid="b75qs4"
                            onClick={handleSubmit}
                        >
                            Login
                        </button>



                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Login;
