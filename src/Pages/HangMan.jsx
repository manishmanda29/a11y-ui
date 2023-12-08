import React, { Component } from "react";
import { randomWord } from '../wordList';

import "./Hangman.css";
import { quiz } from '../GameQuiz';

import img0 from "../images/0.jpg";
import img1 from "../images/1.jpg";
import img2 from "../images/2.jpg";
import img3 from "../images/3.jpg";
import img4 from "../images/4.jpg";
import img5 from "../images/5.jpg";
import img6 from "../images/6.jpg";
import Quiz from 'react-quiz-component';
import Axios from "../axios";
import { toast, ToastContainer } from 'react-toastify';
import {Link,useNavigate} from 'react-router-dom';
import { Header } from "../components/Header";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);

    this.state = { 
      nWrong: 0, 
      guessed: new Set(), 
      score:0,
      submitted:false,
      // answer: "apple"
      answer: randomWord(),
    };

    this.handleGuess = this.handleGuess.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.questionSubmit=this.questionSubmit.bind(this);
    this.onCompleteGame=this.onCompleteGame.bind(this);
  }

  // reset the game and put things in default
  resetGame() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    });
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    // deconstructor
    const { answer, guessed } = this.state;


    return answer['word']
      .split("")
      .map(ltr => (guessed.has(ltr) ? ltr : "_"));
  }
  componentDidUpdate()
  {
    if(this.state.nWrong==6 && this.state.submitted!=true)
    {
      this.onCompleteGame()
    }
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;

    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer['word'].includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    const  { handleGuess } = this;
    const { guessed } = this.state;

    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, index) => (
      <button
        key={index}
        value={ltr}
        onClick={handleGuess}
        disabled={guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  questionSubmit(data)
  {
    if(!data.isCorrect)
    {
        this.setState((prev)=>({nWrong:prev.nWrong+1}))
    }
    else
    {
      this.setState((prev)=>({score:prev.score+20}))
    }

  }

  onCompleteGame(e)
  {
    Axios.post('api/post-game-result', { score: this.state.score }).then(({ data }) => {
      this.setState({submitted:true})
      toast.success("Scores Submitted Successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        draggable: true
    })
  }).catch(({ response }) => {
      toast.error(response?.data?.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          draggable: true
      })
  })
  }

  /** render: render game */
  render() {
    const { nWrong, answer} = this.state;
    const { images, maxWrong } = this.props;

    let alternateText = `${this.state.nWrong} wrong guesses`;
    // const { guessedWord, generateButtons } = this;

    return (
      <>
      <Header />
      <div className='Hangman'>
        <div>
          <img src={images[nWrong]} alt={`Hangman Image - Incorrect Attempt ${nWrong}`} />
          <p>Number Wrong: {nWrong}</p>
        </div>
    
        <div className='hangman-right'>
          {nWrong === maxWrong ?
            <div>
              <p>YOU LOSE </p>
              <p>Correct Word is: {answer['word']}</p>
            </div> :
            <Quiz quiz={quiz} shuffle={true} onQuestionSubmit={this.questionSubmit} onComplete={this.onCompleteGame} />
          }
        </div>
    
        <div style={{ alignSelf: 'baseline', margin: 10 }}>
          <b>Score: {this.state.score}</b>
        </div>
    
        {!this.state.submitted &&
          <button id='reset' onClick={this.onCompleteGame}>Exit</button>
        }
      </div>
      <ToastContainer />
    </>
    
    );
  }
}

export default Hangman;
