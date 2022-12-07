import React from 'react';
import { useState } from "react";
import db from "./firebaseDatabase";
const { getFirestore, collection, setDocs, setDoc, doc, addDoc } = require('firebase/firestore');


const GameOverModal = props => {
    const [userName, setUserName] = useState('')
    const [time, setTime] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userName);

    addData()
    }

    const handleChange = (e) => {
        setUserName(e.target.value)
        setTime(props.totalTime)

    }


  const addData = async () => {
    const docRef = await addDoc(collection(db, "leaderboard"), {
        userName,
        time
      });
  };


    return (
        <div className='fullscreen-container' id='fullscreenContainer'>
            <div className='game-over-modal flex center' id='gameOverModal'>
                <div>
                    <h1>You win!</h1>
                    <h1>{props.totalTime} seconds</h1>
                    <input type="text" id="fname" name="fname" placeholder="Enter your name" onChange={handleChange} value={userName}></input>
                    <button type='submit' onClick={handleSubmit}>Submit score</button>

                </div>
            </div>
        </div>
    );
};


export default GameOverModal;