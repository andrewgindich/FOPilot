import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Вставте сюди ваші реальні налаштування Firebase
// Ви можете отримати їх з консолі Firebase > Project Settings
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

// Ініціалізуємо Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Експортуємо модуль автентифікації