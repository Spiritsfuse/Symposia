import os
import time
import logging
import traceback
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from api.analysis_routes import router as analysis_router
from api.paper_routes import router as paper_router
from api.pdf_routes import router as pdf_router

# Configure logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("main")

app = FastAPI(
    title="Symposia API",
    description="Backend services for Symposia AI Research Synthesis Engine",
    version="1.0.0"
)

# Enable CORS for cross-domain communication between Vercel frontend and Render backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Diagnostics and developer error logging middleware
@app.middleware("http")
async def diagnostics_middleware(request: Request, call_next):
    start_time = time.time()
    try:
        response = await call_next(request)
        duration = time.time() - start_time
        logger.info(
            f"API Event | Path: {request.url.path} | Method: {request.method} | "
            f"Status: {response.status_code} | Duration: {duration:.3f}s"
        )
        return response
    except Exception as e:
        duration = time.time() - start_time
        stack_trace = traceback.format_exc()
        
        # Log detailed diagnostics for developers
        logger.error(
            f"API Error | Path: {request.url.path} | Method: {request.method} | "
            f"Duration: {duration:.3f}s | Exception: {e}\nStack Trace:\n{stack_trace}"
        )
        
        # Return a safe, clean response to users
        is_dev = os.getenv("ENV", "production").lower() == "development"
        error_detail = str(e) if is_dev else "An unexpected error occurred during processing."
        
        return JSONResponse(
            status_code=500,
            content={
                "message": "Internal Server Error",
                "detail": error_detail
            }
        )

app.include_router(paper_router)
app.include_router(pdf_router)
app.include_router(analysis_router)


@app.get("/")
def home():
    return {
        "message": "Symposia Research Synthesis Engine API",
        "status": "online"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
