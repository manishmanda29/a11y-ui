import React, { useEffect, useState } from 'react';
import './ContentPage.css';
import CardTitle from '../components/Card.jsx';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useRef } from "react";
import { compareRef, stringify } from "react-ref-compare";
import { Header } from '../components/Header.jsx';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Axios from '../axios.js';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const TOTAL_TOPICS=3

export default function ContentPage() {
    const [data, setData] = useState([]);
    const [content, setContent] = useState([])
    const [selected, setSelected] = useState(1)
    const [progressData, setProgressData] = useState({})
    const [progress, setProgress] = useState(0);
    const [search,setSearch]=useState('');
    const [keyword,setKeywords]=useState([]);
    const [open,setOpen]=useState(false);
   let inputRef = useRef();
    document.body.addEventListener('click',(e)=>{
        if (inputRef.current && !inputRef.current.contains(e.target)) {
            setOpen(false);
          }
    })
    const getData = () => {
        axios.get(process.env.REACT_APP_BASE_URL + 'api/get-learning-content').then(({ data }) => {
            setData(data)
            getContent()
        }).catch(({ response }) => {
            toast.error(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true,
            });
        });
    };

    const sendCompletedTopic = () => {
        Axios.post('api/set-learning-progress', { contentTitle: selected }).then(({ data }) => {
            getLearningProgress();
        }).catch(({ response }) => {
            toast.error(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true
            })
        })


    }

    const getContent = () => {
        axios.get(process.env.REACT_APP_BASE_URL + 'api/get-learning-content?id=' + selected).then(({ data }) => {
            setContent(data)
        }).catch(({ response }) => {
            toast.error(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true
            })
        })

    }

    const calculateProgressData = () => {
        if (Object.keys(progressData).length > 0) {
            console.log(progressData, "progressDATA")
            let total = progressData.allTopics.length
            let remained = progressData.completedTopics.length
            console.log(total)
            console.log(remained)

            let avg = ((remained) / total) * 100;
            setProgress(Math.trunc(avg))


        }
    };

    const getLearningProgress = () => {
        Axios.get('api/get-learning-progress').then(({ data }) => {
            setProgressData({ ...data });
        }).catch(({ response }) => {
            console.log(response.data.message);
            toast.error(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true,
            });
        });
    };

    const topicHandler = (e) => {
        console.log(e.currentTarget.id)
        setSelected(e.currentTarget.id)
    }

    useEffect(() => {
        getContent()
    }, [selected])
    useEffect(() => {
        calculateProgressData()
    }, [progressData])
    useEffect(() => {
        getData()
        getLearningProgress()

    }, [])

    useEffect(()=>{
        if(data.length>0)
        {
            setSelected(data[0]?.id)
        }


    },[data])

    const handleSubmit=(e)=>{
        Axios.get('api/get-learning-content?search='+search).then(({ data }) => {
            if(Array.isArray(data))
            setData(data)
        else
        setData([])
        }).catch(({ response }) => {
            console.log(response.data.message)
            toast.error(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true
            })
        })


    }

    useEffect(()=>{
    if(search.length>0)
    {
        setOpen(false)
    }
     handleSubmit()
        
    },[search])

    useEffect(()=>{
        console.log(keyword)

    },[keyword])

    const getRecommendations=()=>{
        setOpen(true)
        Axios.get('/api/get-search-recommendations').then(({ data }) => {
            console.log("data",data?.recommendations)
            setKeywords(data?.recommendations)

        }).catch(({ response }) => {
            console.log(response.data.message)
            toast.error(response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                draggable: true
            })
        })

    }
    const handleItemClick=(e)=>{
        console.log(e.currentTarget.id)
        setSelected(e.currentTarget.id)
    }

    const handleNext=()=>{
        setSelected((prev)=>prev+1)
    }
    const handlePrevious=()=>{
        setSelected((prev)=>prev-1)
    }
    // let content = data && data?.content && data?.content?.find((el) => el?.title === selected)
    return (
        <div>
            <Header />
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ margin: 10, display: 'flex', flexDirection: 'column', gap: 5 }} className='left-side'>
                <form style={{margin:10}}onSubmit={handleSubmit} id="demo">
                    <FormControl  ref={inputRef}>
                        <FormLabel
                            sx={(theme) => ({
                                '--FormLabel-color': theme.vars.palette.primary.plainColor,
                            })}
                        >
                        </FormLabel>
                        <Input
                            sx={{ '--Input-decoratorChildHeight': '45px' }}
                            placeholder="Search"
                            type="text"
                            value={search}
                            required
                            autoComplete="off"
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }          onFocus={()=>getRecommendations()}></Input>
                    </FormControl>

                    {open && keyword.length > 0 &&
                    <div style={{width: '22%', height: '33%', background: 'white', position:'fixed',borderTopLeftRadius: 20, borderTopRightRadius: 20, border: '1px #D9D9D9 solid'}}>
                    <ul>
                    {keyword?.map((data)=>{
                        return(
                        <li class={'list'}id={data.id}onClick={handleItemClick}>
                        <TrendingUpIcon/>
                        <span>{data.title}</span>
                        </li>)
                    })}
                    </ul>
                    </div>
}
                    </form>
                    <div>
                        {
                            data?.length>0 ?  data && data?.map((topic) => {
                                return (<CardTitle id={topic?.id} style={{ cursor: 'pointer' ,margin:10}} title={topic?.title} onClick={topicHandler} completedTopic={progressData?.completedTopics && progressData?.completedTopics.find((data) => parseInt(data) === parseInt(topic.id))} />)

                            }):<div>No Results Found</div>
                        }
                    </div></div>
                <div style={{ flex: 3 }} className='right-side'>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        {
                            progress==100 && <Link to={'/certificate'}><button style={{ alignSelf: 'flex-end', width: 96, height: 38, margin: 10, background: 'linear-gradient(0deg, #4584FF 0%, #4584FF 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 10, color: 'white', cursor: 'pointer' }}>Certificate</button></Link>
                        }
                        <CircularProgressbar className={'progress-bar'} value={progress} text={`${progress}%`} />
                    </div>
                    <div className='content'>
                        {content ? (
                            <>
                                <h2>{content?.title}</h2>
                                <p>{content?.description}</p>
                            </>
                        ) : (
                            <h5>Content Not found</h5>
                        )}
                    </div>
                    {progressData?.completedTopics && progressData?.completedTopics.find((data) => data === selected) ?
                        <button style={{ alignSelf: 'flex-end', width: 96, height: 38, margin: 10, background: 'linear-gradient(0deg, #4584FF 0%, #4584FF 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 10, color: 'white', cursor: 'pointer' }}>Completed</button> :
                        <button style={{ alignSelf: 'flex-end', width: 96, height: 38, margin: 10, background: 'linear-gradient(0deg, #4584FF 0%, #4584FF 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 10, color: 'white', cursor: 'pointer' }} onClick={sendCompletedTopic}>Complete </button>
                    }
                    <div style={{display:'flex',justifyContent:'flex-end'}}>
                    {
                       selected!=1 && <button style={{ alignSelf: 'flex-end', width: 96, height: 38, margin: 10, background: 'linear-gradient(0deg, #4584FF 0%, #4584FF 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 10, color: 'white', cursor: 'pointer' }} onClick={handlePrevious}>Previous</button> 
                    }
                    {selected !== TOTAL_TOPICS &&<button style={{ alignSelf: 'flex-end', width: 96, height: 38, margin: 10, background: 'linear-gradient(0deg, #4584FF 0%, #4584FF 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 10, color: 'white', cursor: 'pointer' }} onClick={handleNext}>Next</button> 
                    }</div></div>

                <ToastContainer />
            </div>
        </div>
    );
}
