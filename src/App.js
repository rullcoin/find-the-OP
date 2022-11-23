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
  const [clickLocation, setClickLocation] = useState({left: "0%" , top : "0%"});
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

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
    const coordY = Math.round(
      //(e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
      (e.nativeEvent.offsetY / document.documentElement.offsetHeight) * 100
    );

    console.log(coordX + " " + coordY);


    const clickedCoords = {left: coordX + "%", top: coordY + "%"}
    setClickLocation(clickedCoords)


    fetchData();

    verifyClick(coordX, coordY);
  };

  const verifyClick = (userX, userY) => {
    let charFound = ""

    let isFound = data.find((o) => {
      if (
        verifyClickDegree(userX, o.coordX) && verifyClickDegree(userY, o.coordY)
      ) {
        console.log("Char found" + " " +  o.name);
      }
    });
    return isFound;
  };

  const updateClickLocation = () => {
    const { xCoord, yCoord } = coords;

    const updatedCoords = { left: xCoord + "%", top: yCoord + "%" };
    setClickLocation(updatedCoords);

    //setShowDropdown(true);
  };

  const divDropDown = (e) => {
    let selectedDiv = document.getElementById('myDropdown')
    selectedDiv.classList.toggle("show")

    console.log(e.target.textContent);
  }

  return (
    <div className="App" onClick={divDropDown}>
      <img
        className="op-image"
        id="op-image"
        src={require(".//op.jpeg")}
        alt="One piece"
        onClick={onImgClick}
      ></img>
      <CharDropdown position={clickLocation}/>
    </div>
  );
}

//const analytics = getAnalytics(app);
export default App;
