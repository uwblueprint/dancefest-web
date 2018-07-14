//import * as firebase from './firebase';
import database from './firebase';
import * as auth from './auth';

// Can only access the firebase and auth modules without touching the files
// [making it private ish]
export {
    // firebase,
    database,
    auth,
}