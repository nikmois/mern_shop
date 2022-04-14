// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/storage';

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOM,
  projectId: process.env.REACT_APP_PROJ_ID,
  storageBucket: process.env.REACT_APP_STOR_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

// Get a reference to the storage service, which is used to create references in your storage bucket
export default storage;
