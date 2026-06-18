import logging
from pathlib import Path
import chromadb
from services.embedding_service import embedding_provider, create_embedding

logger = logging.getLogger("vector_service")

VECTORSTORE_PATH = Path(__file__).resolve().parents[1] / "vectorstore"

# Initialize ChromaDB Client
client = chromadb.PersistentClient(path=str(VECTORSTORE_PATH))
collection = client.get_or_create_collection(name="claims")

def add_claim(claim_id: str, claim_text: str, metadata: dict = None):
    """Add a single claim to the vector store (fallback/backward-compatible)."""
    try:
        embedding = create_embedding(claim_text)
        add_kwargs = {
            "ids": [claim_id],
            "embeddings": [embedding.tolist()],
            "documents": [claim_text],
        }
        if metadata:
            add_kwargs["metadatas"] = [metadata]
            
        collection.add(**add_kwargs)
    except Exception as e:
        logger.error(f"Failed to add claim {claim_id} to vector store: {e}")
        raise e

def add_claims_batch(ids: list[str], texts: list[str], metadatas: list[dict] = None):
    """Add multiple claims to the vector store in a single batch, optimizing API calls."""
    if not ids or not texts:
        return
        
    try:
        # Generate all embeddings in a single batch request
        embeddings = embedding_provider.embed_texts(texts)
        
        add_kwargs = {
            "ids": ids,
            "embeddings": embeddings,
            "documents": texts,
        }
        if metadatas:
            add_kwargs["metadatas"] = metadatas
            
        collection.add(**add_kwargs)
        logger.info(f"Successfully batch-inserted {len(ids)} claims to vector store.")
    except Exception as e:
        logger.error(f"Failed to batch insert claims to vector store: {e}")
        raise e

def delete_claims_by_metadata(metadata_filter: dict):
    """Delete claims matching a metadata filter (e.g., delete previous uploads for a file)."""
    try:
        collection.delete(where=metadata_filter)
        logger.info(f"Deleted existing claims matching filter: {metadata_filter}")
    except Exception as e:
        logger.error(f"Failed to delete claims by metadata filter {metadata_filter}: {e}")

def search_claims(query: str, n_results: int = 5) -> dict:
    """Search vector store for matching claims."""
    try:
        query_embedding = embedding_provider.embed_text(query)
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results
        )
        return results
    except Exception as e:
        logger.error(f"Vector search failed: {e}")
        return {"ids": [[]], "documents": [[]], "metadatas": [[]], "distances": [[]]}
