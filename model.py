from datetime import date
from pydantic import BaseModel, EmailStr 
 
 
class UserModel(BaseModel):
    email: EmailStr
    username: str
    password: str
    is_active: bool

    class Config:
        from_attributes = True
 
# class Roles:
#     user=1
#     admin=2
