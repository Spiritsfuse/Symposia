import logging
from fastapi import APIRouter, HTTPException
from services.paper_services import search_papers
from services.vector_service import search_claims

logger = logging.getLogger("paper_routes")
router = APIRouter()


@router.get("/papers/search")
def search(query: str):
    try:
        return search_papers(query)
    except Exception as e:
        logger.error(f"arXiv search failed for query '{query}': {e}")
        raise HTTPException(status_code=502, detail="Failed to retrieve search results from arXiv.")


@router.get("/papers/search-library")
def search_library(query: str):
    if not query.strip():
        return []
        
    try:
        results = search_claims(query, n_results=10)
        formatted_results = []
        
        if results and "documents" in results and results["documents"] and len(results["documents"][0]) > 0:
            documents = results["documents"][0]
            metadatas = results["metadatas"][0]
            ids = results["ids"][0]
            distances = results.get("distances", [[]])[0]
            
            for i in range(len(documents)):
                formatted_results.append({
                    "claim_id": ids[i],
                    "claim": documents[i],
                    "source_file": metadatas[i].get("source_file", "unknown"),
                    "page_number": metadatas[i].get("page_number", 1),
                    "chunk_id": metadatas[i].get("chunk_id", ""),
                    "claim_type": metadatas[i].get("claim_type", "claim"),
                    "distance": float(distances[i]) if i < len(distances) else 1.0
                })
        return formatted_results
    except Exception as e:
        logger.error(f"Library vector search failed for query '{query}': {e}")
        raise HTTPException(status_code=500, detail="Failed to query workspace papers library.")
