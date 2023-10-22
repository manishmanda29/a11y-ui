import Footer from "../components/Footer.jsx";
import LoginImage from '../images/LoginImage.jpg';
import './Login.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '@mui/material/Button';
import BlueLogo from '../images/BlueLogo.svg';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import YoutubeEmbed from "../components/YoutubeEmbed.jsx";
import { useEffect, useState } from "react";
import {Header} from '../components/Header.jsx'

const BASE_URL = process.env.REACT_APP_BASE_URL

export default function LearninVideos() {

    const [Link, setLink] = useState([])
    const getLinks = () => {
        axios.get(process.env.REACT_APP_BASE_URL + '/api/get-learning-videos').then(({ data }) => {
            console.log(data.data)
            setLink(data.data)
        }).catch((error) => {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true
            })
        })

    }

    useEffect(() => {
        getLinks()
    }, [])

    return (
        <div>
           <Header/>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <h1>Learning Videos</h1>
                <div>
                    {
                        Link.length > 0 ? Link.map((data) => {
                            return <YoutubeEmbed embedId={data.link} />
                        }) : <div>No videos Found</div>
                    }
                </div>

            </div>
        </div>
    )
}
