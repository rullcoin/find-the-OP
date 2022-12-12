import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import db from "./components/firebaseDatabase";
import verifyClickDegree from "./components/verifyClickDegree";
import CharDropdown from "./components/charDropdown";
import Header from "./components/header.js";
import GameOverModal from "./components/GameOverModal";

const {
  collection,
  getDocs,
} = require("firebase/firestore");

let startTime = Date.now()

function App() {
  const [data, setData] = useState([]);
  const [clickLocation, setClickLocation] = useState({ left: "0%", top: "0%" });
  const [userPick, setUserPick] = useState(null);
  const [charFoundOnClick, setCharFoundOnClick] = useState();
  const [foundChars, setfoundChars] = useState([]);
  const [totalTime, setTotalTime] = useState()
  const [endingTime, setEndingTime] = useState(0)


  useEffect(() => {
    fetchData();
    verifyPick(userPick, charFoundOnClick);
    checkGameOver()
  }, [userPick, foundChars]);

  const interval = setInterval(function() {
      let elapsedTime = new Date() - startTime
      //console.log(elapsedTime);
      setTotalTime((elapsedTime / 1000))
  }, 1000)

  const fetchData = async () => {
    await getDocs(collection(db, "char-data")).then((snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(newData);
    });
  };

  const onImgClick = (e) => {
    const coordX = Math.round(
      (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
    );
    // Y coordinate used to position dropdown menu correctly
    const coordY = Math.round(
      (e.nativeEvent.offsetY / document.documentElement.offsetHeight) * 100
    );
    // Y coordinate to verify click location
    const nativeCoordY = Math.round(
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
    );

    const clickedCoords = { left: coordX + "%", top: coordY + "%" };

    setClickLocation(clickedCoords);
    // Reset char found on click state if user does not choose an option from the dropdown.
    setCharFoundOnClick(null);
    verifyClick(coordX, nativeCoordY);
  };

  const verifyClick = (userX, userY) => {
    data.find((o) => {
      if (
        verifyClickDegree(userX, o.coordX) &&
        verifyClickDegree(userY, o.coordY)
      ) {
        setCharFoundOnClick(o.name);
      }
    });
  };

  const verifyPick = (char1, char2, e) => {
    if (char1 === char2) {
      // Win logic here
      document.getElementById(`${char1}`).style.opacity = 0.2
      console.log("Correct!");

      // Check if character already found. If not store in a state array.
      if(!foundChars.includes(char1)) {
        setfoundChars([...foundChars, char1])
      } 
      

      // Reset state pick
      setCharFoundOnClick(null);
    }
  };

  const divDropDownSelection = (e) => {
    let selectedDiv = document.getElementById("myDropdown");
    selectedDiv.classList.toggle("show");

    let selectedCharacter = e.target.textContent;

    // Get attribute for char selection if user clicks on image instead of name.
    let selectedCharacterImage = e.target.alt;

    if (selectedCharacter) {
      setUserPick(selectedCharacter);
    } else {
      setUserPick(selectedCharacterImage);
    }
  };

  const gameOver = () => {
    let gameOverModal = document.getElementById("gameOverModal")
    let fullScreenModal = document.getElementById("fullscreenContainer")

    gameOverModal.classList.add("show")
    fullScreenModal.classList.add("show")
  };

  const checkGameOver = () => {
    if(foundChars.length === 3) {
      console.log("You WIN!");
      gameOver()
      setEndingTime(totalTime)
    }
  }

  return (
      <div>
        <Header />
        <div className="App" onClick={divDropDownSelection}>
          <img
            className="op-image"
            id="op-image"
            src={require(".//op.jpeg")}
            alt="One piece"
            onClick={onImgClick}
          ></img>
          <CharDropdown position={clickLocation} />
        </div>
        <GameOverModal totalTime={endingTime}/>
      </div>
  );
}

//const analytics = getAnalytics(app);
export default App;
