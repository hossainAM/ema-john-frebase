// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxoYpIs5YwwoPlPkurwCqHhfuOpbluvDo",
    authDomain: "ema-john-firebase-fd93e.firebaseapp.com",
    projectId: "ema-john-firebase-fd93e",
    storageBucket: "ema-john-firebase-fd93e.appspot.com",
    messagingSenderId: "580977267339",
    appId: "1:580977267339:web:f11abc7cf0b4bc362a7a8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth;