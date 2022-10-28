import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAtaaClcjesyvZUYx33C5nWVf3P8-FP-wY',
  authDomain: 'happy-8ff7b.firebaseapp.com',
  projectId: 'happy-8ff7b',
  storageBucket: 'happy-8ff7b.appspot.com',
  messagingSenderId: '957577144151',
  appId: '1:957577144151:web:29eb78a5ae0875624bc012',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
