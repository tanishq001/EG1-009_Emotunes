from fastapi import FastAPI, UploadFile
from fastapi.responses import StreamingResponse, Response, JSONResponse
from routes import user 
from model import UserModel
import db
from typing import Union  
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI,Request,Depends, APIRouter, HTTPException, responses
#from config import Base, engine, sess_db, UploadFile
from sqlalchemy.orm import Session
from security import get_pass_hash, verify_pass, create_access_token,verify_token, COOKIE_NAME
from pydantic import  EmailStr 
from userrepo import UserRepository, SendEmailVerify
from typing import Annotated
from fastapi.middleware.cors import CORSMiddleware  
from datetime import datetime
import pandas as pd
from emotion import EmotionDetection

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user)

@app.get('/')
def home():
    return{'message': 'Home page'}

@app.post("/api/video")
async def video_stream(request: Request):
  stream: bytes = await request.body()
  file_name = f'{datetime.timestamp(datetime.now())}test.mp4'

  result = b''
  with open(file_name, 'wb') as f:
    f.write(stream)
    result = EmotionDetection().process(file_name)

    mood_mapping = {
    "Disgust": ['Energetic', 'Happy', 'Calm'],
    "Angry": ['Energetic', 'Calm'],
    "Fear": ['Happy', 'Calm'],
    "Happy": ['Sad', 'Happy', 'Calm'],
    "Sad": ['Sad', 'Happy', 'Calm'],
    "Surprise": ['Energetic', 'Happy', 'Sad']
    }
    print(result)
    response = []
    if result in mood_mapping.keys():
      result  = mood_mapping[result]
      df =  pd.read_csv('kaggleMusicMoodFinal.csv')
      df = df[df['Mood'].isin(result)]
      df = df[['Mood','artists','name', 'id']].sample(50)
      response = df.to_dict('records')
      


  return  JSONResponse(content={'music_recomendations':response })
