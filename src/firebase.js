import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvuwSQr-ggMaCX1wavPBomayKOnK3tY0o",
  authDomain: "job-finder-76abc.firebaseapp.com",
  projectId: "job-finder-76abc",
  storageBucket: "job-finder-76abc.appspot.com",
  messagingSenderId: "1028043464789",
  appId: "1:1028043464789:web:4a54b262fc5e00ee7ef4dc",
  measurementId: "G-HPHJJKVRPC",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
