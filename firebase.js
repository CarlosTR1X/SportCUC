import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyD1Bi0EGqvnmuVIZa0Sx33BFMANXGdjml0",
    authDomain: "sport-199d4.firebaseapp.com",
    projectId: "sport-199d4",
    storageBucket: "sport-199d4.appspot.com",
    messagingSenderId: "1008640841106",
    appId: "1:1008640841106:web:071e3cfb6bd21450431d4b",
    measurementId: "G-SP6YG70M8V"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/* Creamos conexion con ire base. */
export const db = getFirestore(app);
