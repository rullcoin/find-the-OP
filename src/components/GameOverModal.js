import React from 'react';
import { useState } from "react";
import db from "./firebaseDatabase";
import {useNavigate} from 'react-router-dom'
const { collection, addDoc } = require('firebase/firestore');


const GameOverModal = props => {
    const [userName, setUserName] = useState('')
    const [time, setTime] = useState('')

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addData()

        // Removes game over modal and show leaderboard on submission.
        let gameOverModal = document.getElementById("gameOverModal")
        let fullScreenModal = document.getElementById("fullscreenContainer")
        
        gameOverModal.classList.remove("show")
        fullScreenModal.classList.remove("show")

        // Redirect user to Leaderboard page on click.
        navigate('/leaderboard')
    }

    const handleChange = (e) => {
        setUserName(e.target.value)
        setTime(props.totalTime)

    }


  const addData = async () => {
     await addDoc(collection(db, "leaderboard"), {
        userName, 
        time
      });
  };


    return (
        <div className='fullscreen-container' id='fullscreenContainer'>
            <div className='game-over-modal flex center' id='gameOverModal'>
                <div className='flex col center'>
                    <div className='border-white-bottom flex center'>
                        <h1>You finished in {props.totalTime} seconds!</h1>
                    </div>
                    <div className='flex col'>
                        <div>
                        <h3>Add your name to the leaderboard!</h3>
                        <input className='modal-form' maxLength={30} type="text" id="fname" name="fname" placeholder="Enter your name" onChange={handleChange} value={userName}></input>
                        </div>
                        <div className='button-container flex gap'>
                        <button className='submit-button' type='submit' onClick={handleSubmit}>Submit score</button>
                        <button className='cancel-button' type='submit'>Cancel</button>

                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};


export default GameOverModal;