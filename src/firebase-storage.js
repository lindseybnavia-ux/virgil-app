import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase-config';

export const firebaseStorage = {
  async get(key) {
    try {
      if (!auth.currentUser) return null;
      const docRef = doc(db, 'users', auth.currentUser.uid, 'data', key);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { value: docSnap.data().value } : null;
    } catch (error) {
      console.error('Error getting:', error);
      return null;
    }
  },

  async set(key, value) {
    try {
      if (!auth.currentUser) return null;
      const docRef = doc(db, 'users', auth.currentUser.uid, 'data', key);
      await setDoc(docRef, { value }, { merge: true });
      return { key, value };
    } catch (error) {
      console.error('Error setting:', error);
      return null;
    }
  }
};