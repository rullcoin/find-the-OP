import React from 'react';
import PropTypes from 'prop-types';
import db from "./firebaseDatabase";
const {
    getFirestore,
    Timestamp,
    FieldValue,
    collection,
    getDocs,
  } = require("firebase/firestore");

const Leaderboard = props => {

    const fetchScores = async () => {
        await getDocs(collection(db, "leaderboard")).then((snapshot) => {
          const newData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log(newData);
        });
      };

      //console.log(fetchScores);
    
    
    return (
        <div>
            <button onClick={fetchScores}>Button</button>
        </div>
    );
};

export default Leaderboard;