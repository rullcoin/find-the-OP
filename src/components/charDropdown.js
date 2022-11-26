import React from "react";
import boaImage from "../img/boa.jpeg";
import whiteBeardImage from "../img/whitebeard.webp";
import pandamanImage from "../img/pandaman.webp";

const CharDropdown = (props) => {
  return (
    <div className="dropdown" style={props.position}>
      <div id="myDropdown" class="dropdown-content">
        <div className="flex selection-content">
          <img className="icons" src={boaImage} value="boa"></img>
          <a href="#">
            Boa
          </a>
        </div>
        <div className="flex selection-content" value="Whitebeard">
          <img className="icons" src={whiteBeardImage}></img>
          <a href="#">Whitebeard</a>
        </div>
        <div className="flex selection-content" value="Pandaman">
          <img className="icons" src={pandamanImage}></img>
          <a href="#">Pandaman</a>
        </div>
      </div>
    </div>
  );
};

export default CharDropdown;
