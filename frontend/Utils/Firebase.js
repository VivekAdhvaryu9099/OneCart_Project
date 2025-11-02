import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyA3cllmcwwvNA8DcD-0aCzzz-WbRIf3wyk",
  authDomain: "e-commerce-39fbe.firebaseapp.com",
  projectId: "e-commerce-39fbe",
  storageBucket: "e-commerce-39fbe.firebasestorage.app",
  messagingSenderId: "700594112751",
  appId: "1:700594112751:web:41b1b8c83cc2533303731a"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth,provider}