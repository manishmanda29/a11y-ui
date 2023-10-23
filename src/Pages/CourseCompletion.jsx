import Footer from "../components/Footer.jsx";
import LoginImage from '../images/LoginImage.jpg';
import './Login.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '@mui/material/Button';
import BlueLogo from '../images/BlueLogo.svg';
import axios from 'axios'
import Axios from '../axios.js'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import YoutubeEmbed from "../components/YoutubeEmbed.jsx";
import { useEffect, useState } from "react";
import { Header } from '../components/Header.jsx'
import './ContentPage.css'
import CardTitle from "../components/Card.jsx";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { exportComponentAsPNG } from "react-component-export-image";
import image from '../images/image.jpg'
import React from "react";
import Bg from '../images/certificatebg.png'
import jwt_decode from "jwt-decode";
 
var token = localStorage?.getItem('access_token');
if(token)
{
    var decoded=jwt_decode(token)
    console.log(decoded)
    
}
const BASE_URL = process.env.REACT_APP_BASE_URL

export default function CourseCompletion() {
    let certificateWrapper = React.createRef();

    const handleDownload = (e) => {
        e.preventDefault();
        exportComponentAsPNG(certificateWrapper, {
            html2CanvasOptions: { backgroundColor: null }
        });
    } 

    return (

        <div>
            <Header />
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 ,display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <h2>
                        Hurray !!!!
                        Course Completed
                    </h2>
                    <h2>
                    Thank you for completing course
                    </h2>
                    <button onClick={handleDownload}>Download certificate</button>
                    <img src={Bg}></img>

                </div>
                <div id="downloadWrapper" ref={certificateWrapper} style={{ flex: 3 }}>
                    <div id="certificateWrapper">
                        <p style={{
                            position: 'relative',
                            left: 185,
                            top: 130,
                        }
                        }
                        >{decoded.username}</p>
                        <img style={{ width: 400, height: 300 }} src={image} alt="Certificate" />
                    </div>
                </div>
            </div>

        </div>
    )
}
