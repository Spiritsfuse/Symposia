from pathlib import Path

from fastapi import (
    APIRouter,
    UploadFile
)

from services.brief_service import (
    generate_research_brief
)

from services.chunk_service import (
    create_chunks_from_pages
)

from services.claim_service import (
    extract_claims
)

from services.pdf_service import (
    extract_pdf_pages
)

from services.synthesis_service import (
    create_synthesis
)


router = APIRouter()

UPLOAD_DIR = "uploads"

Path(
    UPLOAD_DIR
).mkdir(
    exist_ok=True
)


@router.post(
    "/analyze-paper"
)
async def analyze_paper(
    file: UploadFile
):
    file_path = (
        f"{UPLOAD_DIR}/"
        f"{file.filename}"
    )

    with open(
        file_path,
        "wb"
    ) as f:

        content = await file.read()

        f.write(content)

    pages = extract_pdf_pages(
        file_path
    )

    chunks = create_chunks_from_pages(
        pages
    )

    all_claims = []

    for chunk in chunks[:5]:

        claims = extract_claims(
            chunk["content"],
            chunk["page_number"],
            chunk["chunk_id"]
        )

        all_claims.extend(
            claims
        )

    claim_texts = [
        claim["claim"]
        for claim in all_claims
    ]

    synthesis = create_synthesis(
        claim_texts
    )

    brief = generate_research_brief(
        [synthesis]
    )

    return {
        "claims":
        all_claims,

        "synthesis":
        synthesis,

        "research_brief":
        brief
    }
