import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Firebase configuration (hardcoded)
const firebaseConfig = {
  apiKey: 'AIzaSyA7e0yPug14rdAqmQeVttCuPJgVIepdXfc',
  authDomain: 'wordimpostor-a0734.firebaseapp.com',
  databaseURL: 'https://wordimpostor-a0734-default-rtdb.firebaseio.com',
  projectId: 'wordimpostor-a0734',
  storageBucket: 'wordimpostor-a0734.firebasestorage.app',
  messagingSenderId: '1000936855822',
  appId: '1:1000936855822:web:52f85cb6d327dd60e0df5f',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
