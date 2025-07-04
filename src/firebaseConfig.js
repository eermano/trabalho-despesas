import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: "AIzaSyBQYAuqhGapQ0nuHSq_2kwTdNca7gXANBc",
	authDomain: "trabalho-despesas-4412c.firebaseapp.com",
	projectId: "trabalho-despesas-4412c",
	storageBucket: "trabalho-despesas-4412c.firebasestorage.app",
	messagingSenderId: "301006028027",
	appId: "1:301006028027:web:4d6be2fcf376d93c05445e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
