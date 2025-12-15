import { getApp, getApps } from '@react-native-firebase/app';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';

const app = getApps()[0] ?? getApp();

export const firebaseApp = app;
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);
export const listenAuth = onAuthStateChanged;
