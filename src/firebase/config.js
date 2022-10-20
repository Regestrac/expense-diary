// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAgX3A5baKQi1ToCmCREPSSQCPuFtOsKBU',
  authDomain: 'expense-diary-61bd6.firebaseapp.com',
  projectId: 'expense-diary-61bd6',
  storageBucket: 'expense-diary-61bd6.appspot.com',
  messagingSenderId: '634291704397',
  appId: '1:634291704397:web:b86005f15b87ba92414204',
  measurementId: 'G-EKG23XLDXL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
