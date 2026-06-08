from fastapi import FastAPI
from backend.api.paper_routes import router

app = FastAPI()

@app.get("/")
def home():
    return {"message": "hi babe how are u"}

app.include_router(router)

