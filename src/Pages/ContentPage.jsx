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


const BASE_URL = process.env.REACT_APP_BASE_URL

export default function ContentPage() {

    const [data, setData] = useState([])
    const [selected, setSelected] = useState('')
    const [progressData, setProgressData] = useState({})
    const [progress, setProgress] = useState(0)
    const getData = () => {
        axios.get(process.env.REACT_APP_BASE_URL + 'api/get-learning-content').then(({ data }) => {
            console.log(data)
            setSelected(data.topics[0])
            setData(data)
        }).catch(({ response }) => {
            toast.error(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true
            })
        })

    }
    const sendCompletedTopic = () => {
        Axios.post('api/set-learning-progress', { contentTitle: selected }).then(({ data }) => {
            console.log(data)
            getLearningProgress();
        }).catch(({ response }) => {
            console.log(response.data.message)
            toast.error(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true
            })
        })
     

    }

    const calculateProgressData = () => {
        if (Object.keys(progressData).length > 0) {
            let total = progressData.allTopics.length
            let remained = progressData.remainedTopics.length
            let avg = ((total - remained)/ total)*100;
            setProgress(Math.trunc(avg))

        }

    }


    const getLearningProgress = () => {
        Axios.get('api/get-learning-progress').then(({ data }) => {
            setProgressData({ ...data })
        }).catch(({ response }) => {
            console.log(response.data.message)
            toast.error(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true
            })
        })
    }

    const topicHandler = (e) => {
        setSelected(e.target.innerText)
    }
    useEffect(() => {
        calculateProgressData()
    }, [progressData])
    useEffect(() => {
        getData()
        getLearningProgress()

    }, [])
    let content = data && data?.content && data?.content?.find((el) => el?.title === selected)
    return (

        <div>
            <Header />
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ margin: 10, display: 'flex', flexDirection: 'column', gap: 5 }} className='left-side'>
                    {
                        data?.topics && data.topics.map((topic) => {
                            return <CardTitle style={{ cursor: 'pointer' }} title={topic} onClick={topicHandler} />

                        })
                    }
                </div>
                <div style={{ flex: 3 }} className='right-side'>
                    <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                    {
                        progressData?.remainedTopics && progressData?.remainedTopics.length==0 &&<Link to={'/certificate'}><button  style={{ alignSelf: 'flex-end', width: 96, height: 38, margin: 10, background: 'linear-gradient(0deg, #4584FF 0%, #4584FF 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 10, color: 'white', cursor: 'pointer' }}>Certificate</button></Link>
                    }
                    <CircularProgressbar className={'progress-bar'} value={progress} text={`${progress}%`} />
                    </div>
                    <div className="content">
                        {
                            content ?
                                <>
                                    <h2>{content?.title}</h2>
                                    <p>{content?.description}</p>
                                </> : <h5>Content Not found</h5>
                        }

                    </div>
                    {progressData?.completedTopics && progressData?.completedTopics.find((data)=> data===selected)?
                     <button  style={{ alignSelf: 'flex-end', width: 96, height: 38, margin: 10, background: 'linear-gradient(0deg, #4584FF 0%, #4584FF 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 10, color: 'white', cursor: 'pointer' }}>Completed</button>:
                     <button  style={{ alignSelf: 'flex-end', width: 96, height: 38, margin: 10, background: 'linear-gradient(0deg, #4584FF 0%, #4584FF 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 10, color: 'white', cursor: 'pointer' }} onClick={sendCompletedTopic}>Complete </button>
                    }
                        </div>
                   
                <ToastContainer />

            </div>
        </div>
    )
}
