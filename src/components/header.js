import React from 'react';
import boaImage from "../img/boa.jpeg";
import whiteBeardImage from "../img/whitebeard.webp";
import pandamanImage from "../img/pandaman.webp";
import Leaderboard from './leaderboard';

const Header = () => {
    return (
        <div className='header flex center'>
            <div className='flex center gap'>
                <img className="icons-header" src={boaImage} id="Boa" alt="Boa"></img>
                <p>Boa</p>
                <img className="icons-header" src={whiteBeardImage} id="Whitebeard" alt="Whitebeard"></img>
                <p>Whitebeard</p>
                <img className="icons-header" src={pandamanImage} id="Pandaman" alt="Pandaman"></img>
                <p>Pandaman</p>
            </div>
            <Leaderboard />
        </div>
    );
};


export default Header;