// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyBCWOsCG1M0jlqD9dp2LI7f33rPzYqk1_8",
  authDomain: "babypingviin-51fca.firebaseapp.com",
  projectId: "babypingviin-51fca",
  storageBucket: "babypingviin-51fca.appspot.com",
  messagingSenderId: "612373375213",
  appId: "1:612373375213:web:e46e7ed9342ccf448a44e4"
};
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

// Get a reference to the storage service, which is used to create references in your storage bucket
export default storage;
