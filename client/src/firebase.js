
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCgm2s5xroEnQ_KrO-Er7i6W_Io_ekNGtA",
    authDomain: "gqlreactnode-42d41.firebaseapp.com",
    projectId: "gqlreactnode-42d41",
    storageBucket: "gqlreactnode-42d41.appspot.com",
    // messagingSenderId: "510125338410",
    appId: "1:510125338410:web:5510aa871b29b640eaf853",
    measurementId: "G-9N5QXRCGL6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();


export const authFn = firebase.auth()

console.log(typeof firebase.auth.googleAuthProvider);

// export const googleAuthProvider = firebase.auth.googleAuthProvider();
export default firebase;