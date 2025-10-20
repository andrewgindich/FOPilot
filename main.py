# Головний файл додатку (точка входу)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.v1 import auth, taxes, chat

app = FastAPI(
    title="FOPilot API",
    description="Backend for FOPilot application",
    version="1.0.0"
)

# Налаштування CORS для взаємодії з фронтендом
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # В продакшені заміни на домен фронтенду
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