import { api } from './apiService';

export const sendMessageToApi = async (message: string): Promise<string> => {
  try {
    // Використовуємо `api.post` щоб автоматично додавати токен і заголовки
    const data = await api.post('/chat', { message });

    // Очікуємо, що бекенд повертає об'єкт з полем `response` або простий рядок
    if (typeof data === 'string') return data;
    if (data && typeof data.response === 'string') return data.response;

    // Невідомий формат — повертаємо fallback
    console.warn('Unexpected chat response format', data);
    return 'Вибачте, я не отримав зрозумілої відповіді.';
  } catch (error) {
    console.error('Помилка при відправці повідомлення:', error);
    return 'Вибачте, зараз я не можу відповісти. Спробуйте пізніше.';
  }
};

