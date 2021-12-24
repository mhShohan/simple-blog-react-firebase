import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDWb_6lJXWwBYLmlB0waLXlxyOfCB8OOaU',
  authDomain: 'fir-blog-react-c24b8.firebaseapp.com',
  projectId: 'fir-blog-react-c24b8',
  storageBucket: 'fir-blog-react-c24b8.appspot.com',
  messagingSenderId: '465161019492',
  appId: '1:465161019492:web:267605b33ff85aefe73f71'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Firestore Database
export const db = getFirestore(app);

//initialize Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
