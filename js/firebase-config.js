
// FIREBASE CONFIGURATION
const firebaseConfig = {
    apiKey: "AIzaSyBdcn8kwIrCOpBwlxDxoYdR76MepN3lzrs",
    authDomain: "get-on-the-angkott.firebaseapp.com",
    projectId: "get-on-the-angkott",
    storageBucket: "get-on-the-angkott.firebasestorage.app",
    messagingSenderId: "503748101602",
    appId: "1:503748101602:web:9d71c7d59df40095d065bb",
    measurementId: "G-1J8K0YQJ8Q"
};

// INITIALIZE FIREBASE
firebase.initializeApp(firebaseConfig);

// FIRESTORE DATABASE
const db = firebase.firestore();

console.log("Firebase berhasil terhubung!");
