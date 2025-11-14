import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Вставте сюди ваші реальні налаштування Firebase
// Ви можете отримати їх з консолі Firebase > Project Settings
const firebaseConfig = {
  apiKey: "AIzaSyDcczqnIscPxZzIozvyvlpEMdF3KA_LxMI",
  authDomain: "fopilot-e21f3.firebaseapp.com",
  projectId: "fopilot-e21f3",
  storageBucket: "fopilot-e21f3.firebasestorage.app",
  messagingSenderId: ".1017700850121",
  appId: "1:1017700850121:web:4f6f3ba75ab0f36887b018"
  //measurementId: "G-JVCGE5PJRG"
};

// Ініціалізуємо Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Експортуємо модуль автентифікації