# Файл конфігурації, завантажує змінні з .env
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # 1. Firebase
    FIREBASE_SERVICE_ACCOUNT_KEY_PATH: str

    # 2. Monobank
    MONOBANK_API_TOKEN: str
    MONOBANK_API_URL: str

    # 3. Gemini
    GEMINI_API_KEY: str

    # 4. CORS
    # Pydantic автоматически прочитает переменную FRONTEND_ORIGIN из .env
    FRONTEND_ORIGIN: str

    class Config:
        env_file = ".env"

    # 5. НАЛОГИ (НОВАЯ ПЕРЕМЕННАЯ)
    # Мы добавляем переменную для ЕСВ.
    # 1760.00 будет значением по умолчанию, если ее не найдет в .env
    MIN_SOCIAL_CONTRIBUTION_MONTHLY: float = 1760.00

    class Config:
        env_file = ".env"

settings = Settings()


# Файл конфігурації, завантажує змінні з .env

# from pydantic_settings import BaseSettings
#
# class Settings(BaseSettings):
#     FIREBASE_SERVICE_ACCOUNT_KEY_PATH: str
#     REPLICATE_API_TOKEN: str
#     MONOBANK_API_TOKEN: str
#     MONOBANK_API_URL: str
#     LLAMA_MODEL_VERSION: str
#
#     class Config:
#         env_file = ".env"
#
# settings = Settings()

# # Файл конфігурації, завантажує змінні з .env
# from pydantic_settings import BaseSettings
# from typing import List


# class Settings(BaseSettings):
#     FIREBASE_SERVICE_ACCOUNT_KEY_PATH: str
#     MONOBANK_API_TOKEN: str
#     MONOBANK_API_URL: str

#     # Ключ для Google AI Studio (Gemini)
#     GEMINI_API_KEY: str

#     CLIENT_ORIGIN_URLS: List[str] = [
#         "http://localhost:3000",
#         "http://127.0.0.1:3000"
#     ]

#     class Config:
#         env_file = ".env"


# settings = Settings()
