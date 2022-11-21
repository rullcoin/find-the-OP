import "./App.css";
import { useState, useEffect, useRef } from "react";
import React from "react";
import db from "./components/firebaseDatabase";
import verifyClickDegree from "./components/verifyClickDegree";

const {
  getFirestore,
  Timestamp,
  FieldValue,
  collection,
  getDocs,
} = require("firebase/firestore");

function App() {
  const [data, setData] = useState([]);

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
      (e.nativeEvent.offsetY / e.nativeEvent.target.offsetWidth) * 100
    );


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

  const divDropDown = () => {
    console.log("Div was clicked");
  }

  return (
    <div className="App" onClick={divDropDown}>
      <h1>Hies</h1>
      <img
        className="op-image"
        id="op-image"
        src={require(".//op.jpeg")}
        alt="One piece"
        onClick={onImgClick}
      ></img>
      <div className="square"></div>
    </div>
  );
}

//const analytics = getAnalytics(app);
export default App;
