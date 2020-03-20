import Firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBKVIsBiXTYDTSyi15I2zZRLdO30NVF3mU",
    authDomain: "bampor-a3faa.firebaseapp.com",
    databaseURL: "https://bampor-a3faa.firebaseio.com",
    projectId: "bampor-a3faa",
    storageBucket: "bampor-a3faa.appspot.com",
    messagingSenderId: "897787590292",
    appId: "1:897787590292:web:3a57317b61a3cc728f6681",
    measurementId: "G-S0SC5G2C8K"
};

const appConfig = Firebase.initializeApp(firebaseConfig);
export const db = appConfig.database();
export const auth = Firebase.auth();