from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from model import UserModel
from config import client
from db import collection_name
from schemas import  list_serial
from bson import ObjectId
from security import get_pass_hash, verify_pass, create_access_token,verify_token, COOKIE_NAME
from pydantic import  EmailStr 
from userrepo import UserRepository, SendEmailVerify


user=APIRouter(prefix='/api',tags=['Register']) 


@user.post("/register")
def signup_user(username: str ,email:str ,password:str):
    if username=='' or password=='' or email=='':
       return JSONResponse(status_code=400,content={'status': True, "message": "Fill Out All Details"})
    userRepository=UserRepository()
    db_user= userRepository.get_user_by_username(username)
    if db_user:
         return JSONResponse(status_code=401,content={'status': True, "message": "Username Already Exists"})
    
    signup=UserModel(email=email,username=username,password=get_pass_hash(password),is_active=False)
    success=userRepository.create_user(signup)
    token=create_access_token(signup)
    SendEmailVerify.sendVerify(token,email)
    if success:
        return JSONResponse(content={'status': True, "message": "User Created Successfully. Please Verify on provided mail."})
    
    else:
        return JSONResponse(status_code=405,content={'status': True, "message": "User Not Created!!"})

@user.post("/signinuser")
def signin_user(username : str ,password:str):
    if username=='' or password=='':
        return JSONResponse(status_code=400,content={'status': True, "message": "Fill Out All Details"})
    userRepository = UserRepository()
    db_user = userRepository.get_user_by_username(username)

    if not db_user:
        return JSONResponse(status_code=404,content={'status': True, "message": "User Not Registered"})
    if db_user["is_active"]==False:
         return JSONResponse(status_code=401,content={'status': True, "message": "User Not Verified"})

    if verify_pass(password,db_user['password']):
        token=create_access_token(UserModel(**db_user))
        return JSONResponse(content={'status': True, "message": "Login Successfull.", COOKIE_NAME:token,"token_type":"project"})
    else:
        return JSONResponse(status_code=401,content={'status': True, "message": "Password Incorrect"})


@user.get("/{token}")
def verify_user(token):
    userRepository=UserRepository()
    payload=verify_token(token)
    username=payload.get("username")
    db_user=userRepository.get_user_by_username(username)
    if not username:
        raise  HTTPException(
            status_code=401, detail="Credentials not correct."
        )
    
    if db_user['is_active']==True:
        return "Your Account has been already activated."
 
    userRepository.update_is_active(username)
    return "User Verified Successfully."