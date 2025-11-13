import { auth } from '../firebase'; // Імпорт з локального файла налаштувань Firebase
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';

const API_URL = 'http://localhost:8000'; // Базова адреса API

// Збереження токена (можна використовувати sessionStorage)
export const saveToken = (token: string) => {
  localStorage.setItem('firebase_token', token);
};

// Отримання токена
export const getToken = (): string | null => {
  return localStorage.getItem('firebase_token');
};

// Видалення токена
export const removeToken = () => {
  localStorage.removeItem('firebase_token');
};

// Функція логіну
export const login = async (email: string, password: string): Promise<string> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    saveToken(token);
    return token;
  } catch (error) {
    console.error("Помилка логіну:", error);
    throw error;
  }
};

// Функція виходу
export const logout = async () => {
  await signOut(auth);
  removeToken();
};

// Функція реєстрації
// Вона робить 2 речі:
// 1. Створює користувача в Firebase (щоб отримати UID)
// 2. Реєструє користувача у вашому бекенді (щоб створити профіль в Firestore)
export const register = async (name: string, email: string, password: string) => {
  try {
    // 1. Створюємо користувача в Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Викликаємо ваш Python-ендпоінт /auth/register
    // Примітка: ваш Python очікує 'first_name' і 'last_name', а у вас тільки 'name'
    // Я розділю 'name' на дві частини для прикладу
    const [firstName, lastName] = name.split(' ');
    
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: password, // Так, ми відправляємо пароль знову
        first_name: firstName || name,
        last_name: lastName || ''
      })
    });

    if (!response.ok) {
      // Якщо в нашому бекенді сталася помилка, ми маємо видалити користувача з Firebase
      await user.delete();
      throw new Error('Помилка реєстрації на нашому сервері.');
    }

    // Якщо все добре, автоматично логінимо користувача
    return await login(email, password);

  } catch (error) {
    console.error("Помилка реєстрації:", error);
    throw error;
  }
};