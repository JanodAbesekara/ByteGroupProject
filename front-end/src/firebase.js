// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv_HVsJ026_GzsFk-z3BsyalLQgAm63UI",
  authDomain: "bytetcms.firebaseapp.com",
  projectId: "bytetcms",
  storageBucket: "bytetcms.appspot.com",
  messagingSenderId: "541941146484",
  appId: "1:541941146484:web:06b56e7995102c3a9c4221",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

const app1 = initializeApp(firebaseConfig);
export const storage = getStorage(app1);
export const messaging = getMessaging(app);
