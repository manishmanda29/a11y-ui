import React from "react";
import "./Signup.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Footer from "../components/Footer.jsx";
import SignUpImage from '../images/SignUp.png'
import {toast,ToastContainer} from 'react-toastify'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'

export const SignUp = () => {
    let navigate = useNavigate();
    const register = (values, { setSubmitting }) => {
        console.log("I am here");

        axios.post(process.env.REACT_APP_BASE_URL+'api/auth/register',{email:values.email,password:values.password,username:values.username}).then((data)=>
        {
            toast.success("Successfull Registered",{
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true
            });
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        }).catch((error) => {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true
            });
        }).finally(() => {
            setSubmitting(false);
        });
    }

    return (
        <div className="desktop">
            <div className="group-wrapper">
                <div className="group">
                    <div className="overlap" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="overlap-group">
                            <div className="overlap-group-wrapper">
                                <div className="div">
                                    <div className="div-wrapper">
                                        <div className="text-wrapper">11y.ed</div>
                                    </div>
                                    <img
                                        className="logo-shapes"
                                        alt="Logo shapes"
                                        src="https://c.animaapp.com/m60yHrN8/img/logo-shapes-13@2x.png"
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="sign-up">
                                    <span className="span"></span>
                                    <span className="text-wrapper-2">Sign Up</span>
                                </p>
                            </div>
                        </div>
                        <Formik
                            initialValues={{ username: '', email: '', password: '', confirmpassword: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.username) {
                                    errors.username = '*Username is Required';
                                } else if (!values.email) {
                                    errors.email = 'Email is Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                } else if (values.password === '') {
                                    errors.password = '*Password is Required';
                                } else if (values.password !== values.confirmpassword) {
                                    errors.confirmpassword = 'Passwords do not Match';
                                }
                                return errors;
                            }}
                            onSubmit={register}
                        >
                            {({ isSubmitting }) => (
                                <Form className='login-form' style={{ display: "flex", flexDirection: 'column', justifyContent: "center" }}>
                                    <Field className="field" type="text" name="username" placeholder='UserName' />
                                    <ErrorMessage name="username">{msg => <div style={{ color: 'red', fontSize: 14 }}>{msg}</div>}</ErrorMessage>
                                    <Field className="field" type="email" name="email" placeholder='Email' />
                                    <ErrorMessage name="email">{msg => <div style={{ color: 'red', fontSize: 14 }}>{msg}</div>}</ErrorMessage>
                                    <Field className="field" type="password" name="password" placeholder='Password' />
                                    <ErrorMessage name="password">{msg => <div style={{ color: 'red', fontSize: 14 }}>{msg}</div>}</ErrorMessage>
                                    <Field className="field" type="password" name="confirmpassword" placeholder='Confirm Password' />
                                    <ErrorMessage name="confirmpassword">{msg => <div style={{ color: 'red', fontSize: 14 }}>{msg}</div>}</ErrorMessage>
                                    <button disabled={isSubmitting} type='submit' style={{ width: 198, height: 71, alignSelf: 'center', background: 'linear-gradient(0deg, #4584FF 0%, #4584FF 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 10, color: 'white', cursor: 'pointer' }}>Sign Up </button>
                                    <div style={{ color: 'black', fontSize: 16, fontFamily: 'Plus Jakarta Sans', fontWeight: '400', wordWrap: 'break-word', alignSelf: 'center', marginTop: 20 }}>Already an account exists?<Link style={{ width: '100%', color: '#4895EF', fontSize: 16, fontFamily: 'Plus Jakarta Sans', fontWeight: '300', wordWrap: 'break-word', cursor: 'pointer' }} to={'/login'}>Login</Link></div>
                                </Form>
                            )}
                        </Formik>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};
