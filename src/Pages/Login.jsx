import Footer from "../components/Footer.jsx";
import LoginImage from '../images/LoginImage.jpg';
import './Login.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '@mui/material/Button';
import BlueLogo from '../images/BlueLogo.svg';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import {toast,ToastContainer} from 'react-toastify'
import {Link} from 'react-router-dom'

const BASE_URL=process.env.REACT_APP_BASE_URL

export default function Login() {
    const postLoginData=(values, { setSubmitting })=>
    {
        axios.post(process.env.REACT_APP_BASE_URL+'/api/auth/login',{...values}).then((data)=>
        {
            localStorage.setItem("access_token",data?.accessToken)
            toast.success("Success",{
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true
            })
        }).catch((error)=>{
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true
              })
        })

    }
    
    return (
        <div>
            <div style={{ display: 'flex',justifyContent:'center' ,alignItems:'center', gap:36}}>
                <img src={LoginImage} style={{position:"relative",top:'80px'}} />
                <div className='card'>
                    <div style={{display:'flex'}}>
                   <img src={BlueLogo} style={{width:'80px'}}/>
                   <span style={{width: '100%', height: '100%', textAlign: 'center', color: '#4584FF', fontSize: 32, fontFamily: 'Plus Jakarta Sans', fontWeight: '600', wordWrap: 'break-word'}}>11y.ed</span></div>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit={postLoginData}
                    >
                        {({ isSubmitting }) => (
                            <Form  className='login-form' style={{display:"flex",flexDirection:'column',justifyContent:"center"}}>
                                <Field className="field"type="email" name="email" placeholder='Email' />
                                <ErrorMessage name="email">{msg => <div style={{color:'red', fontSize:14}}>{msg}</div>}</ErrorMessage>
                                <Field className="field"type="password" name="password" placeholder='Password'/>
                                <ErrorMessage name="password">{msg => <div style={{color:'red', fontSize:14}}>{msg}</div>}</ErrorMessage>
                              <button style={{width: 198, height:71 ,alignSelf:'center', background: 'linear-gradient(0deg, #4584FF 0%, #4584FF 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 10,color:'white',cursor:'pointer'}}>Login </button>
                            </Form>
                        )}
                    </Formik>
                    <div><div style={{width: '100%', height: '100%', color: 'black', fontSize: 16, fontFamily: 'Plus Jakarta Sans', fontWeight: '400', wordWrap: 'break-word'}}>Need an account?<Link style={{width: '100%', height: '100%', color: '#4895EF', fontSize: 16, fontFamily: 'Plus Jakarta Sans', fontWeight: '300', wordWrap: 'break-word',cursor:'pointer',alignSelf:'center',marginTop:50}} to={'/'}>Sign up</Link></div></div>
                    <ToastContainer /> 
                </div>
            </div>
        </div>
    )
}
