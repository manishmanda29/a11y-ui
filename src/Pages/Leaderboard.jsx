import { useEffect, useState } from 'react';
import { Header } from '../components/Header.jsx'
import './Leaderboard.css'
import Switch from "react-switch";
import Axios from '../axios.js';
import { Toast,ToastContainer } from 'react-toastify';



export default function Leaderboard() {
    const [state, setState] = useState('quiz');
    const [data, setData] = useState([])

    const handleChange = () => {
        if (state == 'quiz')
            setState('game')
        else
            setState('quiz')
    }

    const getData = () => {
        Axios.get('/api/leaderboard?type=' + state).then(({ data }) => {
            console.log("data", data.results)
            setData(data?.results)
        }).catch(({ response }) => {
            console.log(response.data.message)
        })

    }

    useEffect(() => {
        getData()
    }, [state])
    return (
        <div>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center', gap:10, margin: 10 }}>
                <h3>Quizes</h3>
                <Switch onChange={handleChange} checkedIcon={<div></div>} width={75} uncheckedIcon={<div></div>} checked={state == 'quiz' ? false : true} />
                <h3>Games</h3>
            </div>
            <div id="container">
                {

                    data.length>0?data.map((el) => {
                        return (
                            <div class="row">
                                <div class="name">{el?.email}</div><div class="score">{el?.score}</div>
                            </div>
                        )
                    }):<h2>No Results Found</h2>
                }
            </div>
            <ToastContainer/>
        </div>
    )

}