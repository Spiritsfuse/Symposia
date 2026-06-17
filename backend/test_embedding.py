from services.embedding_service import create_embedding

embedding = create_embedding(
    "RAG reduces hallucinations"
)

print(type(embedding))
print(len(embedding))