import os
from dotenv import load_dotenv
from services.providers.gemini_provider import GeminiLLMProvider

load_dotenv()

# Instantiates and exports the default LLM provider using Gemini
_api_key = os.getenv("GEMINI_API_KEY")
llm_provider = GeminiLLMProvider(api_key=_api_key)