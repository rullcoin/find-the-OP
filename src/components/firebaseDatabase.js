import { initializeApp } from "firebase/app";
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyCJ6YYFFg_yCFhw5M98BiTtST6LUTagFeg",
    authDomain: "find-the-op.firebaseapp.com",
    projectId: "find-the-op",
    storageBucket: "find-the-op.appspot.com",
    messagingSenderId: "768603273340",
    appId: "1:768603273340:web:60b68dd99ed16697d331f9",
    measurementId: "G-M8E4BNK05Z"
  };

  // Initialize firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)

  export default db