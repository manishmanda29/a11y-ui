import Footer from "../components/Footer.jsx";
import LoginImage from '../images/LoginImage.jpg';
import './Login.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '@mui/material/Button';
import BlueLogo from '../images/BlueLogo.svg';
export default function Login() {
    return (
        <div>
            <div style={{ display: 'flex',justifyContent:'center' ,alignItems:'center', gap:36}}>
                <img src={LoginImage} style={{position:"relative",top:'80px'}} />
                <div className='card'>
                   <img src={BlueLogo} style={{width:'80px'}}/>
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
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form  className='login-form' style={{display:"flex",flexDirection:'column',justifyContent:"center"}}>
                                <Field className="field"type="email" name="email" placeholder='Email' />
                                <ErrorMessage name="email" component="div" />
                                <Field className="field"type="password" name="password" placeholder='Password'/>
                                <ErrorMessage name="password" component="div" />
                              <button style={{width: 198, height:71 ,alignSelf:'center', background: 'linear-gradient(0deg, #4584FF 0%, #4584FF 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 10,color:'white'}}>Login </button>
                            </Form>
                        )}
                    </Formik>
                    <div style={{width: '100%', height: '100%', color: 'black', fontSize: 16, fontFamily: 'Plus Jakarta Sans', fontWeight: '400', wordWrap: 'break-word'}}>Need an account?<span style={{width: '100%', height: '100%', color: '#4895EF', fontSize: 16, fontFamily: 'Plus Jakarta Sans', fontWeight: '300', wordWrap: 'break-word',cursor:'pointer'}}>Sign up</span></div>
                </div>
            </div>
            <Footer />

        </div>
    )
}
