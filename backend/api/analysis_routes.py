import time
import logging
from pathlib import Path
from fastapi import APIRouter, UploadFile, HTTPException
from services.brief_service import generate_research_brief
from services.chunk_service import create_chunks_from_pages
from services.claim_service import extract_claims
from services.pdf_service import extract_pdf_pages
from services.synthesis_service import create_synthesis
from services.vector_service import delete_claims_by_metadata, add_claims_batch

logger = logging.getLogger("analysis_routes")
router = APIRouter()

UPLOAD_DIR = "uploads"
Path(UPLOAD_DIR).mkdir(exist_ok=True)


@router.post("/analyze-paper")
async def analyze_paper(file: UploadFile):
    total_start_time = time.time()
    logger.info(f"Start Pipeline: Uploaded '{file.filename}'")

    file_path = f"{UPLOAD_DIR}/{file.filename}"

    # 1. Save File
    try:
        content = await file.read()
        with open(file_path, "wb") as f:
            f.write(content)
    except Exception as e:
        logger.error(f"Failed to save uploaded file {file.filename}: {e}")
        raise HTTPException(status_code=500, detail="Failed to save uploaded PDF file.")

    # 2. PDF Parsing Stage
    stage_start = time.time()
    try:
        pages = extract_pdf_pages(file_path)
    except Exception as e:
        logger.error(f"Failed to parse PDF {file.filename}: {e}")
        raise HTTPException(status_code=422, detail="Failed to parse the PDF file. Ensure it is not corrupted.")
    pdf_parse_duration = time.time() - stage_start
    logger.info(f"Pipeline Stage: PDF Parsing completed in {pdf_parse_duration:.3f}s")

    # 3. Chunking Stage
    stage_start = time.time()
    chunks = create_chunks_from_pages(pages)
    chunking_duration = time.time() - stage_start
    logger.info(f"Pipeline Stage: Chunking completed in {chunking_duration:.3f}s ({len(chunks)} chunks generated)")

    # 4. Claim Extraction Stage (chunk-by-chunk)
    stage_start = time.time()
    all_claims = []
    target_chunks = chunks[:5]  # Processing first 5 chunks as in original MVP
    for chunk in target_chunks:
        try:
            claims = extract_claims(
                chunk["content"],
                chunk["page_number"],
                chunk["chunk_id"]
            )
            all_claims.extend(claims)
        except Exception as e:
            logger.warning(f"Failed to extract claims from chunk {chunk['chunk_id']}: {e}")
            
    claim_extraction_duration = time.time() - stage_start
    logger.info(f"Pipeline Stage: Claim Extraction completed in {claim_extraction_duration:.3f}s ({len(all_claims)} claims extracted)")

    # 5. Clear Old database entries (Vector deletion)
    try:
        delete_claims_by_metadata({"source_file": file.filename})
    except Exception as e:
        logger.warning(f"Could not clear previous vector entries for {file.filename}: {e}")

    # 6. Embeddings and Vector Insertion Stage
    stage_start = time.time()
    ids = []
    texts = []
    metadatas = []
    
    for i, claim in enumerate(all_claims):
        claim_id = f"{file.filename}_claim_{i}"
        claim["claim_id"] = claim_id
        claim["source_file"] = file.filename
        
        ids.append(claim_id)
        texts.append(claim["claim"])
        metadatas.append({
            "source_file": file.filename,
            "page_number": claim.get("page_number") or 1,
            "chunk_id": claim.get("chunk_id") or f"chunk_{i}",
            "claim_type": claim.get("claim_type") or "finding"
        })

    if ids:
        try:
            add_claims_batch(ids, texts, metadatas)
        except Exception as e:
            logger.error(f"Failed to batch insert claims to ChromaDB: {e}")
            
    vector_insertion_duration = time.time() - stage_start
    logger.info(f"Pipeline Stage: Embeddings & Vector Insertion completed in {vector_insertion_duration:.3f}s")

    # 7. Synthesis Stage
    stage_start = time.time()
    try:
        claim_texts = [claim["claim"] for claim in all_claims]
        synthesis = create_synthesis(claim_texts)
    except Exception as e:
        logger.error(f"Synthesis stage failed: {e}")
        raise HTTPException(status_code=502, detail="Failed to synthesize claims. Gemini API error.")
    synthesis_duration = time.time() - stage_start
    logger.info(f"Pipeline Stage: Cross-Paper Synthesis completed in {synthesis_duration:.3f}s")

    # 8. Brief Generation Stage
    stage_start = time.time()
    try:
        brief = generate_research_brief([synthesis])
    except Exception as e:
        logger.error(f"Brief compilation stage failed: {e}")
        raise HTTPException(status_code=502, detail="Failed to generate research brief. Gemini API error.")
    brief_duration = time.time() - stage_start
    logger.info(f"Pipeline Stage: Brief Generation completed in {brief_duration:.3f}s")

    # Total Pipeline Duration
    total_pipeline_duration = time.time() - total_start_time
    logger.info(
        f"Pipeline Summary: Uploaded '{file.filename}' processed successfully.\n"
        f"  - PDF Parsing: {pdf_parse_duration:.3f}s\n"
        f"  - Chunking: {chunking_duration:.3f}s\n"
        f"  - Claim Extraction: {claim_extraction_duration:.3f}s\n"
        f"  - Vector Storage (Batch Embeddings): {vector_insertion_duration:.3f}s\n"
        f"  - Cross-Source Synthesis: {synthesis_duration:.3f}s\n"
        f"  - Brief Generation: {brief_duration:.3f}s\n"
        f"  => Total Ingestion & Analysis Duration: {total_pipeline_duration:.3f}s"
    )

    return {
        "claims": all_claims,
        "synthesis": synthesis,
        "research_brief": brief
    }
