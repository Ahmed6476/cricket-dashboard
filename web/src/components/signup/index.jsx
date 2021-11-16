import { useState, useEffect, useRef } from "react"
import axios from 'axios';
import { Row, Col } from 'react-bootstrap'
import { Formik, Field, Form, useFormik } from "formik";
import Stack from '@mui/material/Stack';
// import input from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { baseUrl } from "./../../core"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
} from "react-router-dom";
import './index.css'

const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    address: yup
        .string('Enter your name')
        .required('Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .max(10, 'No more then 10')
        .required('Password is required'),
});

function Signup() {
    let history = useHistory();
    const formik = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            name: '',
            address: '',
            email: '',
            password: '',
        },
        onSubmit: function (values) {
            axios.post(`${baseUrl}/api/v1/signup`, {
                name: values.name,
                email: values.email,
                password: values.password,
                address: values.address
            })
                .then((res) => {
                    console.log("res: ", res.data);
                    if (values.email) {
                        history.push("/")
                    }
                })
        }
    });

    return (

        <div className='center'>
            <h1>Signup page</h1>

            <div className='main_div'>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={0}>

                        <div className="form-group">
                            <input
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}

                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            /><span></span>
                            <label>UserName</label>
                        </div>

                        <div className="form-group">

                            <input

                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}

                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                            />
                            <span></span>
                            <label>Address</label>
                        </div>
                        <div className="form-group">
                            <input

                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}

                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <span></span>
                            <label >Email</label>
                        </div>

                        <div className="form-group">

                            <input
                                type="password"

                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}

                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <span></span>
                            <label>Password</label>
                        </div>
                        <button className='button'>Signup</button>
                        <div></div>
                        <div class="link">
                            Alredy has account? <a href='' onClick={() => { history.push("/") }}>Login</a>
                        </div>
                    </Stack>
                </form>

            </div>

        </div>
        
    );
}
export default Signup;