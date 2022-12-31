import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAFiTb6TnGi9C9ioInF7fpLIqnSt1Xl55o",
  authDomain: "chat-application-c724d.firebaseapp.com",
  projectId: "chat-application-c724d",
  storageBucket: "chat-application-c724d.appspot.com",
  messagingSenderId: "604457136164",
  appId: "1:604457136164:web:0dc3b14b18b68c647528b1",
  measurementId: "G-6LC3R4XSTW",
};

const firebaseapp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
