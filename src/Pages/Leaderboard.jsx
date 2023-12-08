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
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, margin: 10 }}>
    <h3>Quizzes</h3>
    {/* Add a form label for the switch */}
    <label htmlFor="quizSwitch">Toggle between Quizzes and Games</label>
    <Switch
      id="quizSwitch"
      onChange={handleChange}
      checkedIcon={<div></div>}
      width={75}
      uncheckedIcon={<div></div>}
      checked={state === 'quiz' ? false : true}
    />
    <h3>Games</h3>
  </div>
  <div id="container">
    {
      data.length > 0 ? data.map((el, index) => {
        return (
          <div key={index} className="row">
            <div className="name">{el?.email}</div>
            <div className="score">{el?.score}</div>
          </div>
        );
      }) : <h2>No Results Found</h2>
    }
  </div>
  <ToastContainer />
</div>

    )

}