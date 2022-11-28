import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCIG2zlcYDnVgjYHckDXF5LE7CeQhO_dnM",
  authDomain: "react-disney-clone-dd5d8.firebaseapp.com",
  projectId: "react-disney-clone-dd5d8",
  storageBucket: "react-disney-clone-dd5d8.appspot.com",
  messagingSenderId: "688665616991",
  appId: "1:688665616991:web:9dd93dd45a6cec7f86b1ea",
  measurementId: "G-D581XL63B3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
