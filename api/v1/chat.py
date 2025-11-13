# Асинхронний роутер FastAPI для чату.
# Тепер він викликає асинхронну функцію 'get_gemini_response'

from fastapi import APIRouter, Depends
# Ми більше не використовуємо run_in_threadpool
from models.chat import ChatMessageRequest, ChatMessageResponse
# ↓↓↓ ГОЛОВНА ЗМІНА ТУТ ↓↓↓
from llm.chat_service import get_gemini_response  # Імпортуємо нову функцію
from api.deps import get_current_user

router = APIRouter()


@router.post("/", response_model=ChatMessageResponse)
async def chat_with_bot(
    request: ChatMessageRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Надсилає повідомлення користувача до Gemini та повертає відповідь.
    """
    # ↓↓↓ І ЗМІНА ТУТ ↓↓↓
    # Ми просто викликаємо 'await', оскільки функція тепер асинхронна
    reply = await get_gemini_response(request.message)
    return ChatMessageResponse(reply=reply)

# API роутер для чату
# Зміни: 1. Імпортовано run_in_threadpool
#        2. Функція chat_with_bot стала async
#        3. Виклик get_llama_response обгорнуто в await run_in_threadpool

# from fastapi import APIRouter, Depends
# from fastapi.concurrency import run_in_threadpool
# from models.chat import ChatMessageRequest, ChatMessageResponse
# from llm.chat_service import get_llama_response
# from api.deps import get_current_user

# router = APIRouter()


# @router.post("/", response_model=ChatMessageResponse)
# async def chat_with_bot(
#         request: ChatMessageRequest,
#         current_user: dict = Depends(get_current_user)
# ):
#     """
#     Надсилає повідомлення користувача до Llama 2 та повертає відповідь.
#     AI обмежений відповідати лише на теми ФОП та податків.
#     Запит до AI виконується у фоновому потоці, щоб не блокувати сервер.
#     """
#     reply = await run_in_threadpool(get_llama_response, request.message)

#     return ChatMessageResponse(reply=reply)
