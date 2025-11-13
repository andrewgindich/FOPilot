# Ініціалізація сервісів Firebase Admin.
import firebase_admin
from firebase_admin import credentials, auth, firestore
from core.config import settings  # 1. Ми імпортуємо налаштування

db = None
auth_client = None


def initialize_firebase():
    global db, auth_client
    if not firebase_admin._apps:
        # 2. Отримуємо шлях зі змінної 'settings', а НЕ з рядка
        cred = credentials.Certificate(
            settings.FIREBASE_SERVICE_ACCOUNT_KEY_PATH)
        firebase_admin.initialize_app(cred)

    db = firestore.client()
    auth_client = auth


# # Ініціалізація сервісів Firebase Admin

# import firebase_admin
# from firebase_admin import credentials, auth, firestore
# # from core.config import settings

# cred = credentials.Certificate("FIREBASE_SERVICE_ACCOUNT_KEY_PATH")

# firebase_admin.initialize_app(cred)

# # Експортуємо клієнти для використання в інших модулях
# db = firestore.client()
# auth_client = auth
