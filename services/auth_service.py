# Сервісний шар для логіки автентифікації
from fastapi import HTTPException
from core.firebase import db, auth_client
from models.user import UserInDB, UserUpdate


def create_user_profile(uid: str, email: str, first_name: str, last_name: str) -> UserInDB:
    """
    Створює документ користувача в колекції 'users' у Firestore.
    """
    user_doc_data = {
        "uid": uid,
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        "fop_group": 3,
        "tax_rate": 0.05
    }

    # Використовуємо UID з Auth як ID документу в Firestore
    db.collection("users").document(uid).set(user_doc_data)

    return UserInDB(**user_doc_data)


def get_user_profile(uid: str) -> UserInDB | None:
    """
    Отримує профіль користувача з Firestore за його UID.
    """
    doc_ref = db.collection("users").document(uid)
    doc = doc_ref.get()

    if doc.exists:
        return UserInDB(**doc.to_dict())
    return None

def update_user_profile(uid: str, data: UserUpdate) -> UserInDB:
    """
    Обновляет профиль пользователя в ДВУХ местах:
    1. Firebase Authentication (для display_name)
    2. Firestore (для first_name, last_name)
    """
    
    # 1. Обновляем Firebase Authentication (чтобы 'display_name' совпадало)
    try:
        auth_client.update_user(
            uid,
            display_name=f"{data.first_name} {data.last_name}"
        )
    except Exception as e:
        print(f"Ошибка обновления Firebase Auth: {e}")
        raise HTTPException(status_code=500, detail="Ошибка обновления профиля в Auth")

    # 2. Обновляем Firestore (где хранятся наши 'first_name', 'last_name')
    try:
        doc_ref = db.collection("users").document(uid)
        doc_ref.update({
            "first_name": data.first_name,
            "last_name": data.last_name
        })
    except Exception as e:
        print(f"Ошибка обновления Firestore: {e}")
        raise HTTPException(status_code=500, detail="Ошибка обновления профиля в Firestore")
        
    # 3. Возвращаем обновленный профиль (вызываем нашу 'get_user_profile')
    return get_user_profile(uid)