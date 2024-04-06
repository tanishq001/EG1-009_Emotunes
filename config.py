from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from typing import Optional
#from motor.motor_asyncio import AsyncIOMotorClient

uri = "mongodb+srv://Tanisha:Tani_1234@project.rynzyyy.mongodb.net/?retryWrites=true&w=majority&authSource=admin"

# Create a new client and connect to the server
client = MongoClient(uri, tlsAllowInvalidCertificates=True,server_api=ServerApi('1'))

# Send a ping to confirm a successful connection

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

