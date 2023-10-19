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


export default function NotFound() {
    
    return (
        <h1>
        404 Page Not found
        </h1>
    )
}
