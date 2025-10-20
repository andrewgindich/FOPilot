# API роутер для автентифікації

from fastapi import APIRouter, HTTPException, status, Depends
from firebase_admin.auth import EmailAlreadyExistsError

from models.user import UserCreate, UserInDB
from services import auth_service
from core.firebase import auth_client
from api.deps import get_current_user

router = APIRouter()


@router.post("/register", response_model=UserInDB, status_code=status.HTTP_201_CREATED)
def register_user(user_data: UserCreate):
    """
    Створює користувача одночасно в Firebase Authentication
    та в базі даних Firestore.
    """
    try:
        # 1. Створюємо користувача в Firebase Authentication
        user_record = auth_client.create_user(
            email=user_data.email,
            password=user_data.password,
            display_name=f"{user_data.first_name} {user_data.last_name}"
        )

        # 2. Створюємо профіль користувача в Firestore
        user_profile = auth_service.create_user_profile(
            uid=user_record.uid,
            email=user_data.email,
            first_name=user_data.first_name,
            last_name=user_data.last_name
        )
        return user_profile

    except EmailAlreadyExistsError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.get("/me", response_model=UserInDB)
def get_user_me(current_user: dict = Depends(get_current_user)):
    """
    Отримує профіль поточного користувача з Firestore.
    Використовує 'uid' з перевіреного токена.
    """
    uid = current_user.get("uid")
    user_profile = auth_service.get_user_profile(uid)

    if user_profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found in Firestore"
        )
    return user_profile