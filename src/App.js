import "./App.css";
import { useState, useEffect, useRef } from "react";
import React from "react";
import db from "./components/firebaseDatabase";
import verifyClickDegree from "./components/verifyClickDegree";
import CharDropdown from "./components/charDropdown";
const {
  getFirestore,
  Timestamp,
  FieldValue,
  collection,
  getDocs,
} = require("firebase/firestore");

function App() {
  const [data, setData] = useState([]);
  const [clickLocation, setClickLocation] = useState({ left: "0%", top: "0%" });
  const [coords, setCoords] = useState(null);
  const [userPick, setUserPick] = useState(null);
  const [charFoundOnClick, setCharFoundOnClick] = useState();

  useEffect(() => {
    fetchData();
    verifyPick(userPick, charFoundOnClick);
  }, [userPick]);

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

  const verifyPick = (char1, char2) => {
    if (char1 === char2) {
      console.log("Correct!");
      // Reset state pick
      setCharFoundOnClick(null)
    }
  };

  const divDropDownSelection = (e) => {
    let selectedDiv = document.getElementById("myDropdown");
    selectedDiv.classList.toggle("show");

    let selectedCharacter = e.target.textContent;


    setUserPick(selectedCharacter);
  };

  const getClickValue = (e) => {
    console.log(e.target.value);
    console.log(e.target.textContent);

  }

  return (
    <div className="App" onClick={divDropDownSelection}>
      <img
        className="op-image"
        id="op-image"
        src={require(".//op.jpeg")}
        alt="One piece"
        onClick={onImgClick}
      ></img>
      <CharDropdown position={clickLocation} onClickValue={getClickValue}/>
    </div>
  );
}

//const analytics = getAnalytics(app);
export default App;
