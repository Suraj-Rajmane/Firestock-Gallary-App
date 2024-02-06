import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../lib/firebase.config";

const provider = new GoogleAuthProvider();

const FirebaseAuth = {
  signIn: () => {
    return new Promise((resolve) => {
      signInWithPopup(auth, provider)
        .then((response) => resolve(response.user))
        .catch(console.error);
    });
  },
  signOut: () => {
    return new Promise(() => {
      signOut(auth)
        .then((resolve) => {
          console.log("user logged out");
          resolve();
        })
        .catch(console.error);
    });
  },
  getCurrentUser: () => {
    return new Promise((resolve) => {
      return onAuthStateChanged(auth, (response) => {
        resolve(response);
      });
    });
  },
};

export default FirebaseAuth;
