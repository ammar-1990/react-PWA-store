import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'




const firebaseConfig = {
    apiKey: "AIzaSyAy7M6QhB27TgI23DjEbtJRbUT5Hr0gy2w",
    authDomain: "alpha-store-8950e.firebaseapp.com",
    projectId: "alpha-store-8950e",
    storageBucket: "alpha-store-8950e.appspot.com",
    messagingSenderId: "1008167358203",
    appId: "1:1008167358203:web:c7653e17c8b6df8af5aa5e"
  };
  const app = initializeApp(firebaseConfig);
 export  const auth = getAuth(app);
 export const db = getFirestore(app);
 export const storage = getStorage(app);