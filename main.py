from core.firebase import initialize_firebase
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings  # Импортируем наши настройки

# Ініціалізуємо Firebase Admin SDK при старті
initialize_firebase()

from api.v1 import auth, taxes, chat

app = FastAPI(
    title="FOPilot API",
    description="Backend for FOPilot application",
    version="1.0.0"
)

# Налаштування CORS для взаємодії з фронтендом
# Теперь мы читаем URL из нашего объекта 'settings'
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN],  # Используем переменную из .env
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Підключення роутерів
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(taxes.router, prefix="/api/v1/taxes", tags=["Taxes"])
app.include_router(chat.router, prefix="/api/v1/chat", tags=["Chat"])


@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Welcome to FOPilot API"}

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# from api.v1 import auth, taxes, chat
# from core.firebase import initialize_firebase
# from core.config import settings  # Імпортуємо settings

# # Ініціалізуємо Firebase Admin SDK при старті
# initialize_firebase()

# app = FastAPI(
#     title="FOPilot API",
#     description="Backend for FOPilot application",
#     version="1.0.0"
# )

# # Налаштування CORS для взаємодії з фронтендом
# app.add_middleware(
#     CORSMiddleware,
#     # Використовуємо список дозволених джерел з конфігурації
#     allow_origins=settings.CLIENT_ORIGIN_URLS,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Підключення роутерів
# app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
# app.include_router(taxes.router, prefix="/api/v1/taxes", tags=["Taxes"])
# app.include_router(chat.router, prefix="/api/v1/chat", tags=["Chat"])


# @app.get("/", tags=["Root"])
# def read_root():
#     return {"message": "Welcome to FOPilot API"}


# # Головний файл додатку (точка входу)

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# from api.v1 import auth, taxes, chat

# app = FastAPI(
#     title="FOPilot API",
#     description="Backend for FOPilot application",
#     version="1.0.0"
# )

# # Налаштування CORS для взаємодії з фронтендом
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # В продакшені заміни на домен фронтенду
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Підключення роутерів
# app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
# app.include_router(taxes.router, prefix="/api/v1/taxes", tags=["Taxes"])
# app.include_router(chat.router, prefix="/api/v1/chat", tags=["Chat"])

# @app.get("/", tags=["Root"])
# def read_root():
#     return {"message": "Welcome to FOPilot API"}
