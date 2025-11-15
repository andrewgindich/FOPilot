import { auth } from '../firebase'; // Тепер цей імпорт ПРАВИЛЬНИЙ
import {
  signInWithEmailAndPassword,
  signOut,
  // Нам більше не потрібен createUserWithEmailAndPassword тут
} from 'firebase/auth';

// ↓↓↓ ВИПРАВЛЕННЯ №1: Читаємо API_URL з .env файлу (Vite) ↓↓↓
// Це виправить помилку 404 Not Found
const API_URL = import.meta.env.VITE_API_URL; 

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

// Функція логіну (без змін, вона правильна)
// Вона використовує Firebase НАПРЯМУ, щоб увійти
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

// Функція виходу (без змін, вона правильна)
export const logout = async () => {
  await signOut(auth);
  removeToken();
};

// ↓↓↓ ВИПРАВЛЕННЯ №2: ПОВНІСТЮ НОВА ЛОГІКА РЕЄСТРАЦІЇ ↓↓↓
// Тепер фронтенд не заважає бекенду.
// Він ТІЛЬКИ викликає наш бекенд-ендпоінт.
export const register = async (name: string, email: string, password: string) => {
  try {
    // Розділяємо ім'я (логіка з твого файлу)
    const [firstName, lastName] = name.split(' ');
    
    // Крок 1: Фронтенд ТІЛЬКИ викликає наш бекенд
    // API_URL тепер "http://127.0.0.1:8000/api/v1", тому шлях буде правильним
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password, 
        first_name: firstName || name,
        last_name: lastName || ''
      })
    });

    if (!response.ok) {
      // Якщо бекенд повернув помилку (наприклад, 400 "Email already exists")
      // Ми беремо текст помилки з бекенду
      const errorData = await response.json();
      // І кидаємо її, щоб фронтенд міг її показати
      throw new Error(errorData.detail || 'Помилка реєстрації на нашому сервері.');
    }

    // Крок 2: Якщо бекенд відповів 201 Created, ми автоматично логінимо користувача
    // (використовуючи нашу КЛІЄНТСЬКУ функцію логіну)
    return await login(email, password);

  } catch (error) {
    console.error("Помилка реєстрації:", error);
    
    // Перекидаємо помилку, щоб компонент React міг її "зловити"
    if (error instanceof Error) {
        throw error;
    }
    // Для інших типів помилок
    throw new Error(String(error));
  }
};