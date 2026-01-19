import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
apiKey: "AIzaSyDnPX3CZ3UlfUVPhC1Jyh19AtgW5FPWtfM",
  authDomain: "virgil-9b322.firebaseapp.com",
  projectId: "virgil-9b322",
  storageBucket: "virgil-9b322.firebasestorage.app",
  messagingSenderId: "918672786914",
  appId: "1:918672786914:web:68e25a88dc8ed90de725bb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);