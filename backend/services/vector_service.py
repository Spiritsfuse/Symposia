from pathlib import Path

import chromadb

from services.embedding_service import create_embedding

VECTORSTORE_PATH = Path(__file__).resolve().parents[1] / "vectorstore"

client = chromadb.PersistentClient(path=str(VECTORSTORE_PATH))

collection = client.get_or_create_collection(name="claims")


def add_claim(claim_id, claim_text, metadata=None):
    embedding = create_embedding(claim_text)

    add_kwargs = {
        "ids": [claim_id],
        "embeddings": [embedding.tolist()],
        "documents": [claim_text],
    }

    if metadata:
        add_kwargs["metadatas"] = [metadata]

    collection.add(**add_kwargs)


def search_claims(query, n_results=5):
    query_embedding = create_embedding(query)

    results = collection.query(
        query_embeddings=[query_embedding.tolist()], n_results=n_results
    )

    return results
