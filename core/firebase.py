# Ініціалізація сервісів Firebase Admin

import firebase_admin
from firebase_admin import credentials, auth, firestore
# from core.config import settings

cred = credentials.Certificate("FIREBASE_SERVICE_ACCOUNT_KEY_PATH")

firebase_admin.initialize_app(cred)

# Експортуємо клієнти для використання в інших модулях
db = firestore.client()
auth_client = auth