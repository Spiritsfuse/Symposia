import json

from services.synthesis_service import create_synthesis

claims = [
    "RAG reduces hallucinations",
    "Retrieval improves factual accuracy",
    "Retrieval methods reduce hallucinations",
]

result = create_synthesis(claims)

print(result)

with open("data/syntheses.json", "w") as f:

    json.dump(result, f, indent=4)
