import {auth} from 'firebase';

// If you want to set up auth features, you can use these.
// This is just me thinking ahead. Feel free to delete it.
// I was just going on a tangent as I was working on firebase...

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) => (
  auth.createUserWithEmailAndPassword(email, password)
);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) => (
  auth.signInWithEmailAndPassword(email, password)
);

// Sign Out
export const doSignOut = () => (
    auth.signOut()
);

// Password Reset
export const doPasswordReset = (email) => (
  auth.sendPasswordResetEmail(email)
);

// Password Change
export const doPasswordUpdate = (password) => (
  auth.currentUser.updatePassword(password)
);