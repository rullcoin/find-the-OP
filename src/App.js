import './App.css';
import {useState, useEffect} from 'react';
import React from 'react'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const { getFirestore, Timestamp, FieldValue, collection, getDocs } = require('firebase/firestore');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ6YYFFg_yCFhw5M98BiTtST6LUTagFeg",
  authDomain: "find-the-op.firebaseapp.com",
  projectId: "find-the-op",
  storageBucket: "find-the-op.appspot.com",
  messagingSenderId: "768603273340",
  appId: "1:768603273340:web:60b68dd99ed16697d331f9",
  measurementId: "G-M8E4BNK05Z"
};

function App() {
  const [data, setData] = useState([]);

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app)
  
  const fetch = async () => {
    await getDocs(collection(db, "char-data"))
  .then((snapshot) => {  
    const newData = snapshot.docs
    .map((doc) => ({...doc.data(), id:doc.id }));     
      setData(newData);
  })
  }

  useEffect(()=> {
    fetch()
    console.log(data);
  }, [])

  const onImgClick = (e) => {
    console.log(e.pageX + "X coordinates");
    console.log(e.pageY + "Y coordinates");
  }
  
  return (
    <div className="App">
      <h1>Hies</h1>
      <img className='op-image' src={require('.//op.jpeg')} alt="One piece" onClick={onImgClick}></img>
    </div>
  );
}


//const analytics = getAnalytics(app);
export default App;
