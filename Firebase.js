import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDPCFb0cnFyd83n0QYdjwFEPxjZofrpOKQ",
  authDomain: "shoppinglist-54e90.firebaseapp.com",
  databaseURL: "https://shoppinglist-54e90-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shoppinglist-54e90",
  storageBucket: "shoppinglist-54e90.appspot.com",
  messagingSenderId: "651220363279",
  appId: "1:651220363279:web:8db93d64e8cf24b1235b7a"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const authentication = getAuth(app);

export { app, authentication, database };