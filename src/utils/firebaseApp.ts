// firebase
//import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

// application
const firebaseApp = firebase.initializeApp(firebaseConfig);

// firestore
const db = firebase.firestore(firebaseApp);
const auth = firebase.auth();

export { firebaseApp, db, auth };
