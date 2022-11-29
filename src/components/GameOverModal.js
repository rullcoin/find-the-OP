import React from 'react';

const GameOverModal = props => {
    return (
        <div className='game-over-modal flex center' id='gameOverModal'>
            <div>
                <h1>You win!</h1>
            </div>
        </div>
    );
};

GameOverModal.propTypes = {
    
};

export default GameOverModal;