from abc import ABC, abstractmethod
from typing import List

class LLMProvider(ABC):
    @abstractmethod
    def generate_text(self, prompt: str, temperature: float = 0.0, system_instruction: str = None, response_json: bool = False) -> str:
        """Generate text from a prompt."""
        pass

class EmbeddingProvider(ABC):
    @abstractmethod
    def embed_text(self, text: str) -> List[float]:
        """Generate vector embedding for a given text."""
        pass

    @abstractmethod
    def embed_texts(self, texts: List[str]) -> List[List[float]]:
        """Generate vector embeddings for a list of texts in batch."""
        pass
