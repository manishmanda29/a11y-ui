import { useEffect, useState } from 'react';
import { Header } from '../components/Header.jsx'
import './Leaderboard.css'
import Switch from "react-switch";
import Axios from '../axios.js';
import { useTimer } from 'react-timer-hook';
import { toast, ToastContainer } from 'react-toastify';
import './Quiz.css'


export default function Leaderboard() {
    const time = new Date();
    const [state, setState] = useState('quiz');
    const [data, setData] = useState([])
    const [answers, setAnswers] = useState([])
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
    } = useTimer({ expiryTimestamp: time.setSeconds(time.getSeconds() + 60), onExpire: () => handleSubmit() });


    const getQuestions = () => {
        Axios.get('/api/get-quiz-questions').then(({ data }) => {
            setData(data)
        }).catch(({ response }) => {
            console.log(response.data.message)
        })

    }

    useEffect(() => {
        getQuestions()
        start()

    }, [])

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

    useEffect(() => {
        console.log(answers)

    }, [answers])

    const handleSubmit = () => {
        Axios.post('/api/post-quiz-answers', { answers: answers }).then(({ data }) => {
            pause();
            toast.success('Quiz Submitted Successfully')
            console.log(data)
        }).catch(({ response }) => {
            console.log(response.data.message)
        })

    }
    return (
        <div>
            <Header />

            <div style={{display :'flex',float:'right'}}>
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
                            <div style={{ width: '100%', height: '100%', color: '#333333', fontSize: 16, fontFamily: 'Ubuntu', fontWeight: '500', wordWrap: 'break-word', margin: 10 }}><b>{index + 1}:{el?.question}</b></div>
                            <div>
                                {
                                    el?.options.map((option) => {
                                        return (
                                            <div style={{ width: '100%', height: '100%', color: '#333333', fontSize: 14, fontFamily: 'Ubuntu', fontWeight: '400', wordWrap: 'break-word', padding: 20 }}><input type="radio" value={option['option']} onChange={(e) => handleValueChange(e, el)} checked={isChecked(el, option['option'])}></input> {option['option-content']}</div>

                                        )
                                    })
                                }
                            </div></>
                    )


                })
            }
            <ToastContainer />

        </div>
    )

}