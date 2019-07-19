import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDpo9MpabGvAvM7j-0ypCuDYD4fWabeNpg",
  authDomain: "dancefest-198709.firebaseapp.com",
  databaseURL: "https://dancefest-198709.firebaseio.com",
  projectId: "dancefest-198709",
  storageBucket: "dancefest-198709.appspot.com",
  messagingSenderId: "620228359926"
};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
db.settings({ timestampsInSnapshots: true });

export const auth = firebaseApp.auth();
export const firebaseField = firebase.firestore.FieldValue;
export default db;
