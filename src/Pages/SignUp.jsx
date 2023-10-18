import React from "react";
import "./Signup.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Footer from "../components/Footer.jsx";
import SignUpImage from '../images/SignUp.png'
import axios from 'axios'

export const SignUp = () => {

    const register=()=>{

    }

    return (
        <div className="desktop">
            <div className="group-wrapper">
                <div className="group">
                    <div className="overlap" style={{display:'flex',justifyContent:'center'}}>
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
                                <span className="text-wrapper-2">Sign Up Manda</span>
                            </p>
                          
                        </div>
                        </div>
                        <Formik
                            initialValues={{ email: '', password: '',confirmpassword:'' }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Email is Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                else if(
                                    values.password===''
                                )
                                {
                                    errors.password='Password is Required'
                                }
                                else if(values.password!=values.confirmpassword)
                                {
                                    errors.confirmpassword='passwords donot match '
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }, 400);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className='login-form' style={{ display: "flex", flexDirection: 'column', justifyContent: "center" }}>
                                    <Field className="field" type="email" name="email" placeholder='Email' />
                                    <ErrorMessage name="email" component="div" />
                                    <Field className="field" type="password" name="password" placeholder='Password' />
                                    <ErrorMessage name="password" component="div" />
                                    <Field className="field" type="password" name="password1" placeholder='Confirm Password' />
                                    <ErrorMessage name="password1" component="div" />
                                    <button style={{ width: 198, height: 71, alignSelf: 'center', background: 'linear-gradient(0deg, #4584FF 0%, #4584FF 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 10, color: 'white' }}>Sign Up </button>
                                </Form>
                                
                            )}
                        </Formik>
                        {/* <div style={{width: '100%', height: '100%', color: 'black', fontSize: 16, fontFamily: 'Plus Jakarta Sans', fontWeight: '400', wordWrap: 'break-word'}}>Need an account?<span style={{width: '100%', height: '100%', color: '#4895EF', fontSize: 16, fontFamily: 'Plus Jakarta Sans', fontWeight: '300', wordWrap: 'break-word',cursor:'pointer'}}>Sign up</span></div>  */}
                       
                    </div>
                    
                </div>

            </div>
        </div>
        
    );
};
