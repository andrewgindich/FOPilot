import { getToken } from './authService';

const API_URL = 'http://localhost:8000';

// Це буде наш головний "міст" для всіх запитів до API
export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  // Налаштовуємо заголовки
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`); // <-- АВТОМАТИЧНО ДОДАЄМО ТОКЕН
  }

  // Об'єднуємо опції
  const config: RequestInit = {
    ...options,
    headers: headers,
  };

  // Виконуємо запит
  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    // Якщо сервер повертає 401 (не авторизовано), можливо, токен застарів
    if (response.status === 401) {
      // TODO: Тут можна додати логіку для оновлення токена
      console.error("Запит не авторизовано. Можливо, потрібно оновити токен.");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Приклади методів
export const api = {
  get: (endpoint: string) => apiFetch(endpoint, { method: 'GET' }),
  
  post: (endpoint: string, body: any) => 
    apiFetch(endpoint, { 
      method: 'POST', 
      body: JSON.stringify(body) 
    }),
  
  // Додайте put, delete тощо за потреби
};