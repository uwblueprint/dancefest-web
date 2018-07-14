import database from './firebase';

// for user authentication this will be required later
const auth = {};

// Can only access the firebase and auth modules without touching the files
// [making it private ish]
export {
  database,
  auth
};
