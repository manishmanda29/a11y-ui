import Footer from "../components/Footer.jsx";
import LoginImage from '../images/LoginImage.jpg';
import './Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '@mui/material/Button';
import BlueLogo from '../images/BlueLogo.svg';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Login() {
    let navigate = useNavigate();

    const postLoginData = (values, { setSubmitting }) => {
        axios.post(buildLoginUrl(), { ...values })
            .then(({ data }) => {
                console.log(data);
                localStorage.setItem("access_token", data?.accessToken);
                displaySuccessToast();
                redirectToHome();
            })
            .catch((error) => {
                handleApiError(error);
            });
    }

    function buildLoginUrl() {
        return BASE_URL + 'api/auth/login';
    }

    function displaySuccessToast() {
        toast.success("Success", {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: true
        });
    }

    function redirectToHome() {
        setTimeout(() => {
            navigate('/home');
        }, 1000);
    }

    function handleApiError(error) {
        if (error.response) {
            const errorMessage = error.response.data.message;
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true
            });
        } else {
            toast.error("An error occurred.", {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true
            });
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 36 }}>
                <img src={LoginImage} alt="Login" style={{ position: "relative", top: '80px' }} />
                <div className='card'>
                    <div style={{ display: 'flex' }}>
                        <img src={BlueLogo} alt="Blue Logo" style={{ width: '80px' }} />
                        <span style={{ width: '100%', height: '100%', textAlign: 'center', color: '#4584FF', fontSize: 32, fontFamily: 'Plus Jakarta Sans', fontWeight: '600', wordWrap: 'break-word' }}>11y.ed</span>
                    </div>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={validateForm}
                        onSubmit={postLoginData}
                    >
                        {() => (
                            <Form className='login-form' style={{ display: "flex", flexDirection: 'column', justifyContent: "center" }}>
                                <Field className="field" type="email" name="email" placeholder='Email' />
                                <ErrorMessage name="email">{msg => <div style={{ color: 'red', fontSize: 14 }}>{msg}</div>}</ErrorMessage>
                                <Field className="field" type="password" name="password" placeholder='Password' />
                                <ErrorMessage name="password">{msg => <div style={{ color: 'red', fontSize: 14 }}>{msg}</div>}</ErrorMessage>
                                <button style={{ width: '198px', height: '71px', alignSelf: 'center', background: 'linear-gradient(0deg, #4584FF 0%, #4584FF 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: '10px', color: 'white', cursor: 'pointer' }}>Login</button>
                            </Form>
                        )}
                    </Formik>
                    <div>
                        <div style={{ width: '100%', height: '100%', color: 'black', fontSize: 16, fontFamily: 'Plus Jakarta Sans', fontWeight: '400', wordWrap: 'break-word' }}>Need an account?<Link style={{ width: '100%', height: '100%', color: '#4895EF', fontSize: 16, fontFamily: 'Plus Jakarta Sans', fontWeight: '300', wordWrap: 'break-word', cursor: 'pointer', alignSelf: 'center', marginTop: '50px' }} to={'/sign-up'}>Sign up</Link></div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}
