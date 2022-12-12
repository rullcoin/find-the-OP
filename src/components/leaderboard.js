import React from "react";
import { useState, useEffect } from "react";
import db from "./firebaseDatabase";
import {Link} from "react-router-dom";
const { collection, getDocs } = require("firebase/firestore");

const Leaderboard = () => {
  const [scores, setScores] = useState();

  const fetchScores = async () => {
    await getDocs(collection(db, "leaderboard")).then((snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      // Sort data from quickest time and store state
      console.log("rendered");
      setScores(
        newData.sort((a, b) => {
          return a.time - b.time;
        })
      );
    });
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <div className="leaderboard-container flex center" id="fullscreen-container-leaderboard">
        <div className="flex gap">
            <Link to="/">
               <h3>Home</h3>
            </Link>
            <h1>Top 10 scores</h1>
        </div>
        <div className="leaderboard-score flex center" id="leaderboard">
        {scores === undefined
            ? <div> Loading! </div>
            : scores.map((scores, index) => {
                if (index >= 10) {
                    return
                }
                return (
                <div className="leaderboard-score" key={index}>
                <div className="score-container flex border-white-bottom"> 
                    <div className="rank"><h2>{index+1}.</h2> </div>
                
                    <div className="flex gap center">
                        <h2>{scores.userName}</h2>
                        <h3>{scores.time}s</h3>
                     </div>
                        
                    </div>
                </div>
                );
            })}
        </div>
    </div>
  );
};

export default Leaderboard;
