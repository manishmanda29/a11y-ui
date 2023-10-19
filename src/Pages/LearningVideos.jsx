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
import YoutubeEmbed from "../components/YoutubeEmbed.jsx";

const BASE_URL=process.env.REACT_APP_BASE_URL

export default function LearninVideos() {
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

        <div style={{display:'flex',alignItems:'center'}}>
            <h1>Learning Videos</h1>
           <YoutubeEmbed embedId="rokGy0huYEA" />
        </div>
        </div>
    )
}
