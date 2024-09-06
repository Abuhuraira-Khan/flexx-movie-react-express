import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAdAtD0V-1xh51f7ny1ITw8iITojWtimo4",
    authDomain: "flexx-bf51e.firebaseapp.com",
    databaseURL: "https://flexx-bf51e-default-rtdb.firebaseio.com",
    projectId: "flexx-bf51e",
    storageBucket: "flexx-bf51e.appspot.com",
    messagingSenderId: "303427412177",
    appId: "1:303427412177:web:f1c8f153287de2ec5965f0",
    measurementId: "G-3E9VNN7E40"
  };

  const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;