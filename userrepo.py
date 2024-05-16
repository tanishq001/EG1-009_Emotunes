from typing import Union
from fastapi import FastAPI,Request, APIRouter, HTTPException, Response
from model import UserModel
from pydantic import EmailStr
from typing import  Dict, Any
import smtplib
from db import collection_name
from email.message import EmailMessage
from sqlalchemy.orm import Session
from pydantic import  EmailStr 

class UserRepository:

    def create_user(self,signup:UserModel):
         try:
             self.is_active=False
             collection_name.insert_one(dict(signup), )
             #self.sess.commit()
             print("created")
         except:
             return False
         return True
 
    def get_user(self):
       return  collection_name.find_one()
    
    def get_user_by_email(self,email:EmailStr):
        return collection_name.find_one({"email": email})
    
    def get_user_by_username(self,username:str):
        print(collection_name.find_one({"username": username}))
        return collection_name.find_one({"username": username})
        
    def update_is_active(self,username:str) -> bool:
        collection_name.find_one_and_update({"username":username},{
            "$set":{"is_active":True}
        })
    
    def update_user(self,id:int,details:Dict[str,Any]) -> bool:
        collection_name.find_one_and_update({"_id":id},{
         "$set":dict(UserModel)
         })
    
 
class SendEmailVerify:
 
  def sendVerify(token,email):
    email_address = "tanmud754@gmail.com" # type Email
    email_password = "tlbkqffcprmfjbya" 
 
    # create email
    msg = EmailMessage()
    msg['Subject'] = "Verify Email"
    msg['From'] = email_address
    msg['To'] =email 
    msg.set_content(
       f"""\
    Click below link to Verify Your Emotunes Account        
     https://mpvnpzpw-8000.inc1.devtunnels.ms/api/{token}
    """,
         
    )
    # send email
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(email_address, email_password)
        smtp.send_message(msg)