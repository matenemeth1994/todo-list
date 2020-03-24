import * as firebase from "firebase/app";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB-C9t0Wwz_qHha3AkyJKU8IbOGFRcBpSM",
  authDomain: "todo-challenge-b9d6e.firebaseapp.com",
  databaseURL: "https://todo-challenge-b9d6e.firebaseio.com",
  projectId: "todo-challenge-b9d6e",
  storageBucket: "todo-challenge-b9d6e.appspot.com",
  messagingSenderId: "291322555687",
  appId: "1:291322555687:web:32079f237be9f66fa64d02"
  };

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
