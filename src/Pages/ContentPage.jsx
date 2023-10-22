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
import './ContentPage.css'
import CardTitle from "../components/Card.jsx";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const BASE_URL = process.env.REACT_APP_BASE_URL

export default function ContentPage() {

    const [data, setData] = useState([])
    const getLinks = () => {
        axios.get(process.env.REACT_APP_BASE_URL + '/api/get-learning-videos').then(({ data }) => {
            console.log(data.data)
        }).catch((error) => {
            toast.error(error.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true
            })
        })

    }
    const sendCompletedTopic=()=>{

    }
    return (
        <div>
           <Header/>
            <div style={{ display: 'flex',gap:'20px' }}>
                <div style={{margin:10,display:'flex',flexDirection:'column',gap:5}} className='left-side'>
                <CardTitle title={'Getting started'}/>
                <CardTitle title={'heklp'}/>
                <CardTitle title={'heklp'}/>
                <CardTitle title={'heklp'}/>
                <CardTitle title={'heklp'}/>
                <CardTitle title={'heklp'}/>
                <CardTitle title={'heklp'}/>
                </div>
                <div  style={{flex:3}}className='right-side'>
                <CircularProgressbar  className={'progress-bar'} value={50} text={`50%`}/>
                <div className="content">
                    <h2>Title</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                <button style={{alignSelf:'flex-end',width: 96, height:38 ,margin:10, background: 'linear-gradient(0deg, #4584FF 0%, #4584FF 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 10,color:'white',cursor:'pointer'}} onClick={sendCompletedTopic}>Complete </button>
                </div>

            </div>
        </div>
    )
}
