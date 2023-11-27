import { useEffect, useState } from 'react';
import { Header } from '../components/Header.jsx'
import './Leaderboard.css'
import Switch from "react-switch";
import Axios from '../axios.js';
import { useTimer } from 'react-timer-hook';
import { toast, ToastContainer } from 'react-toastify';
import './Quiz.css'
import { useNavigate } from 'react-router-dom';


export default function Leaderboard() {
    const navigate = useNavigate();
    const optionHash= {0:'A',1:'B',2:'C',3:'D'}
    const time = new Date();
    const [state, setState] = useState('quiz');
    const [data, setData] = useState([])
    const [answers, setAnswers] = useState([]);
    const [starting, setStarting] = useState(false);
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp: time.setSeconds(time.getSeconds() + 600), onExpire: () => handleSubmit() });


    const getQuestions = () => {
        Axios.get('/api/get-quiz-questions').then(({ data }) => {
            setData(data)
        }).catch(({ response }) => {
            console.log(response.data.message)
        })

    }

    useEffect(() => {
        if(starting==true)
        {
        getQuestions()
        start()
        }
    }, [starting])

    const handleValueChange = (e, el) => {
        let solution = { id: el.id, option: e.target.value }
        let answersObj = [...answers];
        let foundObj = answersObj.findIndex((l) => l.id == el.id);
        if (foundObj == -1) {
            answersObj.push(solution)
        }
        else {
            answersObj[foundObj] = solution
        }
        setAnswers([...answersObj])
    }
    const isChecked = (el, option) => {
        let found = answers.find((l) => l.id == el.id);
        if (!found) {
            return false
        }
        if (found.option == option) {
            return true
        }
        return false
    }
    const handleSubmit = () => {
        Axios.post('/api/post-quiz-answers', { answers: answers }).then(({ data }) => {
            pause();
            toast.success('Quiz Submitted Successfully,You will be navigated to Leaderboard')
            setTimeout(() => {
                navigate('/Leaderboard')

            }, 3000)
        }).catch(({ response }) => {
            console.log(response.data.message)
        })

    }
    const home = () => {
        return (
            <div style={{textAlign:'center'}}>
                <h3>QUIZ</h3>
                <p><b>Welcome to Accessibility Quiz !!!!</b><br></br>you will be give Multiple choice Questions and select answers and submit answers
                  <br></br> There is also a timer of one minute please answer under that time
                </p>
                <button  onClick={(() => setStarting(true))} style={{width: 100, height:50 ,alignSelf:'center', background: 'linear-gradient(0deg, #4584FF 0%, #4584FF 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)', borderRadius: 10,color:'white',cursor:'pointer'}}>Start </button>

            </div>
        )
    }
    return (
        <div>
            <Header />
            {starting?
            <div>
            <div style={{ display: 'flex', float: 'right' }}>
                <h3>Timer : </h3>
                <div class="base-timer">
                    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g class="base-timer__circle">
                            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                            <path
                                id="base-timer-path-remaining"
                                stroke-dasharray="283"
                                class="base-timer__path-remaining ${remainingPathColor}"
                                d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
                            ></path>
                        </g>
                    </svg>
                    <span id="base-timer-label" class="base-timer__label">{minutes}:{seconds}
                    </span>
                </div>
                <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#3C813F', borderRadius: 28, justifyContent: 'flex-start', alignItems: 'flex-end', gap: 10, display: 'inline-flex', float: 'right', margin: 10, cursor: 'pointer' }}>
                    <div style={{ width: 118, height: 28, textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Outfit', fontWeight: '400', wordWrap: 'break-word' }} onClick={handleSubmit}>Submit</div>
                </div>
            </div>
            {
                data.map((el, index) => {
                    return (
                        <>
                            <div style={{ width: '100%', height: '100%', color: '#333333', fontSize: 24, fontFamily: 'Ubuntu', fontWeight: '500', wordWrap: 'break-word', margin: 10 }}><b>{index + 1}:{el?.question}</b></div>
                            <div>
                                {
                                    el?.options.map((option,index) => {
                                        return (
                                            <div style={{ width: '100%', height: '100%', color: '#333333', fontSize: 18, fontFamily: 'Ubuntu', fontWeight: '400', wordWrap: 'break-word', padding: 20 }}>{optionHash[index]}<input type="radio" value={option['option']} onChange={(e) => handleValueChange(e, el)} checked={isChecked(el, option['option'])}></input> {option['option-content']}</div>

                                        )
                                    })
                                }
                            </div>
                        </>
                    )
                })
            }
            <ToastContainer /></div>:home()}
        </div>
    )

}