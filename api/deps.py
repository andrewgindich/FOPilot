# Залежності (Dependencies) для FastAPI

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from firebase_admin.auth import InvalidIdTokenError, ExpiredIdTokenError
from core.firebase import auth_client

# Ця схема лише "вчить" Swagger показувати кнопку "Authorize"
# Реальна логіка бере токен з заголовка Authorization
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """
    Перевіряє Firebase ID Token, який надійшов у заголовку Authorization.
    Повертає розкодований токен (словник з даними користувача, вкл. 'uid').
    """
    try:
        # Верифікуємо токен, який надіслав фронтенд
        decoded_token = auth_client.verify_id_token(token)
        return decoded_token
    except ExpiredIdTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except InvalidIdTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )