import os
import numpy as np
from dotenv import load_dotenv
from services.providers.gemini_provider import GeminiEmbeddingProvider

load_dotenv()

_api_key = os.getenv("GEMINI_API_KEY")
embedding_provider = GeminiEmbeddingProvider(api_key=_api_key)

def create_embedding(text: str) -> np.ndarray:
    """Backward compatible helper function using Gemini embeddings, returning a numpy array."""
    values = embedding_provider.embed_text(text)
    return np.array(values, dtype=np.float32)