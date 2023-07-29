import * as firebase from "firebase";
import firestore from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyABDggLbGI1cpYJruXzDPLDDZuLLQWgjVw",
  authDomain: "mi-mascota-a3b05.firebaseapp.com",
  projectId: "mi-mascota-a3b05",
  storageBucket: "mi-mascota-a3b05.appspot.com",
  messagingSenderId: "256392957605",
  appId: "1:256392957605:android:5cfa4166f3fb8e4830874c"
};


firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;