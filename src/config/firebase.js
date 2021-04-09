// Your web app's Firebase configuration
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDP42uHpFa-9Iyrp1td7kKe9YLKF-wanyg",
    authDomain: "recipe-app-d5052.firebaseapp.com",
    databaseURL: "https://recipe-app-d5052-default-rtdb.firebaseio.com",
    projectId: "recipe-app-d5052",
    storageBucket: "recipe-app-d5052.appspot.com",
    messagingSenderId: "1085157042196",
    appId: "1:1085157042196:web:3a66a12da2b00284855f01"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;