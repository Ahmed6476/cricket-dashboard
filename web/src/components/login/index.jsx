import { useState, useEffect, useRef } from "react"
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import "./../signup/index.css"
import { Formik, Field, Form, useFormik } from "formik";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { baseUrl} from "./../../core"


import { GlobalContext } from '../../context/Context';
import { useContext } from "react";


const validationSchema = yup.object({
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

function Login() {
  let history = useHistory();

  let { state, dispatch } = useContext(GlobalContext);


  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: function (values) {
      console.log("values: ", values)

      axios.post(`${baseUrl}/api/v1/login`, {
        email: values.email,
        password: values.password,
      }, {
        withCredentials: true
      })
        .then((res) => {
          console.log("res: ", res.data);

          if (res.data.email) {

            dispatch({
              type: "USER_LOGIN",
              payload: {
                name: res.data.name,
                email: res.data.email,
                _id: res.data._id
              }
            })
            // history.push("/")
          }


        })

    }
  });

  return (
    <div className='center'>
      <h1>Login page</h1>
      <div className='main_div'>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={0}>

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
          </Stack>
          <button className='button'>Login</button>
          <div class="link">
            I don't have an account? <a href='' onClick={() => { history.push("/signup") }}>Signup</a>
          </div>



        </form>
      </div>

    </div>
  );
}
export default Login;