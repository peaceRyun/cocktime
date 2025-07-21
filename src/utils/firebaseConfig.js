import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore'; // Import firestore module

// Initialize Firebase if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp();
}

const db = firebase.firestore();

export { db };