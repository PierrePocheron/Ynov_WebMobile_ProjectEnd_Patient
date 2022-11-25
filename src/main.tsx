import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCZbAg8OA4ORhqQ6mxzdLkz6xg6eeaesec",
  authDomain: "webmobile-projectend.firebaseapp.com",
  projectId: "webmobile-projectend",
  storageBucket: "webmobile-projectend.appspot.com",
  messagingSenderId: "991829801579",
  appId: "1:991829801579:web:e90025fcdb436a2319cf2e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
