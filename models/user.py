# Pydantic моделі для даних користувача

from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    uid: str
    fop_group: int = 3
    tax_rate: float = 0.05