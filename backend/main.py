from fastapi import FastAPI
from api.analysis_routes import (
    router as analysis_router
)
from api.paper_routes import router
from api.pdf_routes import router as pdf_router


app = FastAPI()

app.include_router(router)
app.include_router(pdf_router)
app.include_router(
    analysis_router
)

@app.get("/")
def home():
    return {
        "message": "Research Synthesis Engine"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
