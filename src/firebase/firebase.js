import firebase from 'firebase/app';
// import 'firebase/auth';
import 'firebase/database';
// import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDdyVFa9xk5ts63G2ST4Xtm2kHWrku3z4U",
    authDomain: "dancefest-198709.firebaseapp.com",
    databaseURL: "https://dancefest-198709.firebaseio.com",
    projectId: "dancefest-198709",
    storageBucket: "dancefest-198709.appspot.com",
    messagingSenderId: "620228359926"
};

var fire = firebase.initializeApp(config);

const database = fire.database();

export default database;

// if (!firebase.app.length) {
//     firebase.initializeApp(config);
// }

// const auth = firebase.auth();

// export {
//     auth,
// };