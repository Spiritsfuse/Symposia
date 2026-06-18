import time
import os
import logging
import requests
from typing import List, Optional
from services.providers.provider_interface import LLMProvider, EmbeddingProvider

logger = logging.getLogger("gemini_provider")

def call_with_retry(func, max_retries=3, initial_delay=1.0, backoff_factor=2.0):
    delay = initial_delay
    for attempt in range(max_retries):
        try:
            return func()
        except requests.exceptions.RequestException as e:
            if attempt == max_retries - 1:
                logger.error(f"API call failed after {max_retries} attempts: {e}")
                raise e
            logger.warning(f"API call failed (attempt {attempt + 1}/{max_retries}), retrying in {delay:.2f}s: {e}")
            time.sleep(delay)
            delay *= backoff_factor

class GeminiLLMProvider(LLMProvider):
    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        self.model = model or os.getenv("GEMINI_LLM_MODEL", "gemini-3.1-flash-lite")
        
    def generate_text(self, prompt: str, temperature: float = 0.0, system_instruction: str = None, response_json: bool = False) -> str:
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY environment variable is not set.")
            
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent?key={self.api_key}"
        
        payload = {
            "contents": [
                {
                    "parts": [{"text": prompt}]
                }
            ],
            "generationConfig": {
                "temperature": temperature
            }
        }
        
        if system_instruction:
            payload["systemInstruction"] = {
                "parts": [{"text": system_instruction}]
            }
            
        if response_json:
            payload["generationConfig"]["responseMimeType"] = "application/json"
            
        def perform_call():
            response = requests.post(url, json=payload, timeout=60)
            if response.status_code == 429:
                raise requests.exceptions.RequestException("Gemini API rate limit exceeded (429).")
            elif response.status_code >= 500:
                raise requests.exceptions.RequestException(f"Gemini server error ({response.status_code}).")
            response.raise_for_status()
            return response
            
        response = call_with_retry(perform_call)
        data = response.json()
        
        candidates = data.get("candidates", [])
        if not candidates:
            feedback = data.get("promptFeedback", {})
            block_reason = feedback.get("blockReason")
            if block_reason:
                raise ValueError(f"Gemini API blocked response due to: {block_reason}")
            raise ValueError("Gemini API returned an empty response with no candidates.")
            
        candidate = candidates[0]
        finish_reason = candidate.get("finishReason")
        if finish_reason and finish_reason not in ("STOP", "MAX_TOKENS", None):
            raise ValueError(f"Gemini generation stopped unexpectedly with reason: {finish_reason}")
            
        content = candidate.get("content", {})
        parts = content.get("parts", [])
        if not parts:
            raise ValueError("Gemini candidate contains no content parts.")
            
        return parts[0].get("text", "")

class GeminiEmbeddingProvider(EmbeddingProvider):
    def __init__(self, api_key: Optional[str] = None, model: Optional[str] = None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        self.model = model or os.getenv("GEMINI_EMBEDDING_MODEL", "gemini-embedding-2")
        
    def embed_text(self, text: str) -> List[float]:
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY environment variable is not set.")
            
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:embedContent?key={self.api_key}"
        
        payload = {
            "model": f"models/{self.model}",
            "content": {
                "parts": [{"text": text}]
            }
        }
        
        def perform_call():
            response = requests.post(url, json=payload, timeout=30)
            if response.status_code == 429:
                raise requests.exceptions.RequestException("Gemini API rate limit exceeded (429).")
            elif response.status_code >= 500:
                raise requests.exceptions.RequestException(f"Gemini server error ({response.status_code}).")
            response.raise_for_status()
            return response
            
        response = call_with_retry(perform_call)
        data = response.json()
        
        embedding = data.get("embedding", {})
        values = embedding.get("values", [])
        if not values:
            raise ValueError("Gemini Embedding API returned no values.")
        return values

    def embed_texts(self, texts: List[str]) -> List[List[float]]:
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY environment variable is not set.")
        if not texts:
            return []
            
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:batchEmbedContents?key={self.api_key}"
        
        requests_payload = []
        for text in texts:
            requests_payload.append({
                "model": f"models/{self.model}",
                "content": {
                    "parts": [{"text": text}]
                }
            })
            
        payload = {"requests": requests_payload}
        
        def perform_call():
            response = requests.post(url, json=payload, timeout=60)
            if response.status_code == 429:
                raise requests.exceptions.RequestException("Gemini API rate limit exceeded (429).")
            elif response.status_code >= 500:
                raise requests.exceptions.RequestException(f"Gemini server error ({response.status_code}).")
            response.raise_for_status()
            return response
            
        response = call_with_retry(perform_call)
        data = response.json()
        
        embeddings_list = data.get("embeddings", [])
        if not embeddings_list:
            raise ValueError("Gemini Batch Embedding API returned no embeddings.")
            
        embeddings_values = []
        for emb in embeddings_list:
            values = emb.get("values", [])
            if not values:
                raise ValueError("One of the batch embeddings returned no values.")
            embeddings_values.append(values)
            
        return embeddings_values
