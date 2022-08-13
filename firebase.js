import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getDatabase,
  ref as databaseRef,
  set as databaseSet,
  onValue as databaseOnValue,
  get as databaseGet,
  child as databaseChild,
  off as databaseOff,
  query as databaseQuery,
  orderByChild,
  equalTo,
} from "firebase/database";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
  query as firestoreQuery,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
import Config from "react-native-config";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //   apiKey: Config.API_KEY,
  //   authDomain: Config.AUTH_DOMAIN,
  //   projectId: Config.PROJECT_ID,
  //   storageBucket: Config.STORAGE_BUCKET,
  //   messagingSenderId: Config.MESSAGEING_SENDER_ID,
  //   appId: Config.APP_ID,
  apiKey: "AIzaSyAuQmI8ARMUKeMgO0Btk4cJtVrx8m0eafw",
  authDomain: "shaohuo-5a709.firebaseapp.com",
  projectId: "shaohuo-5a709",
  storageBucket: "shaohuo-5a709.appspot.com",
  messagingSenderId: "474631129226",
  appId: "1:474631129226:web:e339d0512e03a8a37d0573",
  measurementId: "G-FT5B2JX0C6",
};
console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

export {
  storage,
  storageRef,
  uploadBytesResumable,
  getDownloadURL,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  database,
  databaseRef,
  databaseSet,
  databaseOnValue,
  databaseGet,
  databaseChild,
  databaseOff,
  databaseQuery,
  orderByChild,
  equalTo,
  firestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
  firestoreQuery,
  orderBy,
  where,
  onSnapshot,
};
