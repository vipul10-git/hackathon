import firebase from "firebase/app";
import "firebase/database";

const config = {
    apiKey: "AIzaSyD_5ZWmWI-hYjnN2e0b-1f7Gb5CoWjHiLc",
    authDomain: "hackathon-9c3b7.firebaseapp.com",
    projectId: "hackathon-9c3b7",
    storageBucket: "hackathon-9c3b7.appspot.com",
    messagingSenderId: "406096909199",
    appId: "1:406096909199:web:fdc1ba15d3f587a3dcb1fa",
    databaseURL : "https://hackathon-9c3b7-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(config);


export { firebase };