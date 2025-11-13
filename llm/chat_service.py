import google.generativeai as genai
from fastapi import HTTPException, status
from core.config import settings
from .prompts import SYSTEM_PROMPT

# Налаштовуємо клієнт Gemini
try:
    genai.configure(api_key=settings.GEMINI_API_KEY)
    model = genai.GenerativeModel(model_name="gemini-2.5-flash-preview-09-2025")
except Exception as e:
    print(f"ПОМИЛКА ІНІЦІАЛІЗАЦІЇ GEMINI: {e}")
    model = None

async def get_gemini_response(user_prompt: str) -> str:
    """
    Надсилає запит до Gemini API.
    Ця версія використовує start_chat() для сумісності зі старими
    версіями бібліотеки, які не знають 'system_instruction'.
    """
    if model is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Сервіс Gemini AI не ініціалізовано. Перевірте API-ключ."
        )
    
    try:
        # КРОК 1: Ми починаємо чат-сесію
        chat_session = model.start_chat(
            # Ми "встановлюємо" особистість бота,
            # відправивши СИСТЕМНИЙ ПРОМПТ як перше повідомлення
            history=[
                {'role': 'user', 'parts': [SYSTEM_PROMPT]},
                {'role': 'model', 'parts': ["Так, я готовий допомогти. Я FOPilot Assistant."]}
            ]
        )
        
        # КРОК 2: Ми надсилаємо реальне повідомлення користувача
        response = await chat_session.send_message_async(user_prompt)
        
        return response.text
        
    except Exception as e:
        # Обробляємо будь-які помилки від API
        print(f"ПОМИЛКА API GEMINI: {e}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Помилка при зверненні до Gemini API: {str(e)}"
        )



# # Цей файл інкапсулює логіку взаємодії з Google Gemini API.
# # Він повністю асинхронний.

# import google.generativeai as genai
# from fastapi import HTTPException, status
# from core.config import settings
# from .prompts import SYSTEM_PROMPT

# # Налаштовуємо клієнт Gemini
# try:
#     genai.configure(api_key=settings.GEMINI_API_KEY)
#     model = genai.GenerativeModel(
#         model_name="gemini-2.5-flash-preview-09-2025")
# except Exception as e:
#     # Це спрацює, якщо API-ключ неправильний або відсутній
#     print(f"ПОМИЛКА ІНІЦІАЛІЗАЦІЇ GEMINI: {e}")
#     model = None


# async def get_gemini_response(user_prompt: str) -> str:
#     """
#     Надсилає запит до Gemini API з системним промптом.
#     Це асинхронна функція.
#     """
#     if model is None:
#         raise HTTPException(
#             status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
#             detail="Сервіс Gemini AI не ініціалізовано. Перевірте API-ключ."
#         )

#     try:
#         # Використовуємо новий API з `system_instruction`
#         response = await model.generate_content_async(
#             user_prompt,
#             generation_config={"temperature": 0.7},
#             system_instruction=SYSTEM_PROMPT
#         )

#         if not response.parts:
#             raise Exception("AI did not return a valid response part.")

#         return response.text

#     except Exception as e:
#         # Обробляємо будь-які помилки від API
#         print(f"ПОМИЛКА API GEMINI: {e}")
#         raise HTTPException(
#             status_code=status.HTTP_502_BAD_GATEWAY,
#             detail=f"Помилка при зверненні до Gemini API: {str(e)}"
#         )


# # Цей файл інкапсулює логіку взаємодії з Google Gemini API.

# import google.generativeai as genai
# from google.generativeai.types import HarmCategory, HarmBlockThreshold
# from fastapi import HTTPException, status

# from core.config import settings
# from .prompts import SYSTEM_PROMPT  # Ваш промпт залишається незмінним!

# # Конфігуруємо API ключ
# try:
#     genai.configure(api_key=settings.GEMINI_API_KEY)
# except Exception as e:
#     print(f"Помилка конфігурації Gemini API: {e}")
#     # Це не зупинить запуск, але get_gemini_response буде падати
#     # доки ключ не буде вірно надано.

# # Налаштування моделі
# # Використовуємо Flash - вона швидка і дешева, ідеально для чат-бота.
# GENERATION_CONFIG = {
#     "temperature": 0.7,
#     "top_p": 1,
#     "top_k": 1,
#     "max_output_tokens": 500,
# }

# # Ми довіряємо нашому SYSTEM_PROMPT для безпеки.
# # Вимикаємо вбудовані фільтри безпеки Gemini, щоб вони
# # не блокували легітимні відповіді про "податки" (taxes).
# SAFETY_SETTINGS = {
#     HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
#     HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
#     HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
#     HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
# }

# # Ініціалізуємо модель один раз
# model = genai.GenerativeModel(
#     model_name="gemini-2.5-flash-preview-09-2025",
#     generation_config=GENERATION_CONFIG,
#     safety_settings=SAFETY_SETTINGS,
#     # Ваш системний промпт ідеально підходить для system_instruction
#     system_instruction=SYSTEM_PROMPT
# )


# async def get_gemini_response(user_prompt: str) -> str:
#     """
#     Надсилає асинхронний запит до Gemini API.
#     """
#     try:
#         # Використовуємо асинхронний метод
#         response = await model.generate_content_async(user_prompt)

#         # Перевіряємо, чи є відповідь
#         if not response.candidates or not response.candidates[0].content.parts:
#             raise HTTPException(
#                 status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#                 detail="AI не змогла згенерувати відповідь."
#             )

#         return response.text

#     except Exception as e:
#         # Обробляємо будь-які помилки API
#         raise HTTPException(
#             status_code=status.HTTP_502_BAD_GATEWAY,
#             detail=f"Помилка сервісу AI (Gemini): {str(e)}"
#         )


# # Сервісний шар для взаємодії з Llama 2 (Replicate)

# import replicate
# import os
# from core.config import settings
# from .prompts import SYSTEM_PROMPT

# # Встановлюємо API токен для бібліотеки Replicate
# os.environ["REPLICATE_API_TOKEN"] = settings.REPLICATE_API_TOKEN


# def get_llama_response(user_prompt: str) -> str:
#     """
#     Надсилає запит до Llama 2 через Replicate API з системним промптом.
#     """
#     try:
#         output_iterator = replicate.run(
#             settings.LLAMA_MODEL_VERSION,
#             input={
#                 "prompt": user_prompt,
#                 "system_prompt": SYSTEM_PROMPT,
#                 "max_new_tokens": 500,
#                 "temperature": 0.7
#             }
#         )

#         response_parts = [str(part) for part in output_iterator]
#         return "".join(response_parts)

#     except replicate.exceptions.ReplicateError as e:
#         return f"Виникла помилка при зверненні до AI: {str(e)}"
#     except Exception as e:
#         return f"Виникла невідома помилка: {str(e)}"
