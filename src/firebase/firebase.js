import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDdyVFa9xk5ts63G2ST4Xtm2kHWrku3z4U',
  authDomain: 'dancefest-198709.firebaseapp.com',
  databaseURL: 'https://dancefest-198709.firebaseio.com',
  projectId: 'dancefest-198709',
  storageBucket: 'dancefest-198709.appspot.com',
  messagingSenderId: '620228359926'
};

const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;
