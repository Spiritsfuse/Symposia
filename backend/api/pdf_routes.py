from pathlib import Path

from fastapi import APIRouter, UploadFile
from services.pdf_service import extract_pdf_pages

router = APIRouter()

UPLOAD_DIR = "uploads"

Path(UPLOAD_DIR).mkdir(exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile):
    file_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    pages = extract_pdf_pages(file_path)

    return {
        "filename": file.filename,
        "total_pages": len(pages)
    }
