// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {API_KEY, AUTH_DOMAIN, 
  PROJECT_ID, STORAGE_BUCKET, 
  MESSAGING_SENDER_ID, APP_ID 
} from '@env'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID    
};

console.log("Valor de api key", API_KEY);

// Initialize Firebase
const test = initializeApp(firebaseConfig);
test ? console.log('Firebase initialized successfully') : console.log('Firebase initialization failed');
const database2 = getFirestore();
database ? console.log('Firestore initialized mierda') : console.log('Firestore initialization mas mierda');  
export const database = getFirestore();