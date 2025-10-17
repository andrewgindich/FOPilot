# Сервісний шар для логіки автентифікації

from core.firebase import db
from models.user import UserInDB


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