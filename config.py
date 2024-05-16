from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from typing import Optional

uri = "mongodb+srv://Tanisha:Tani_1234@project.rynzyyy.mongodb.net/?retryWrites=true&w=majority&authSource=admin"

client = MongoClient(uri, tlsAllowInvalidCertificates=True,server_api=ServerApi('1'))

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

