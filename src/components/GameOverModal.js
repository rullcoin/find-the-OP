import React from 'react';
import { useState } from "react";

let start = new Date();

const GameOverModal = props => {
    

    return (
        <div className='game-over-modal flex center' id='gameOverModal'>
            <div>
                <h1>You win!</h1>
                <h1>{props.totalTime}</h1>
            </div>
        </div>
    );
};


export default GameOverModal;