import json
import logging
from typing import List, Literal, Optional
from pydantic import BaseModel, Field, ValidationError
from services.llm_service import llm_provider

logger = logging.getLogger("claim_service")

class ClaimItem(BaseModel):
    claim: str
    claim_type: Literal["finding", "limitation", "hypothesis", "future_work"]

class ClaimExtractionResponse(BaseModel):
    claims: List[ClaimItem]

PROMPT = """
You are a research paper analyst.

Extract the following from the text:
1. Findings
2. Limitations
3. Hypotheses
4. Future Work

For each claim, determine its text and type. The claim type MUST be one of: "finding", "limitation", "hypothesis", or "future_work".
Return ONLY valid JSON corresponding to the requested schema.

Expected JSON Schema:
{{
    "claims": [
        {{
            "claim": "text of the finding",
            "claim_type": "finding"
        }},
        {{
            "claim": "text of the limitation",
            "claim_type": "limitation"
        }}
    ]
}}

Text to analyze:
{text}
"""

def extract_claims(chunk_text: str, page_number: Optional[int] = None, chunk_id: Optional[str] = None) -> List[dict]:
    if not chunk_text.strip():
        return []
        
    prompt = PROMPT.format(text=chunk_text)
    response_text = ""
    
    try:
        response_text = llm_provider.generate_text(
            prompt=prompt,
            temperature=0.0,
            response_json=True
        ).strip()
        
        # Clean up markdown code blocks if any
        if response_text.startswith("```"):
            response_text = response_text.strip("`").strip()
            if response_text.startswith("json"):
                response_text = response_text[4:].strip()
                
        # Parse and validate with Pydantic
        parsed = ClaimExtractionResponse.model_validate_json(response_text)
        claims = [claim.model_dump() for claim in parsed.claims]
        
    except (ValidationError, json.JSONDecodeError, Exception) as e:
        logger.error(f"Failed to extract/validate claims: {e}. Raw response: {response_text}")
        
        # Recovery attempt: try loading using json.loads directly if validation failed
        try:
            if response_text:
                data = json.loads(response_text)
                raw_claims = data.get("claims", [])
                claims = []
                for rc in raw_claims:
                    claim_text = rc.get("claim")
                    claim_type = rc.get("claim_type")
                    if claim_text and claim_type in ("finding", "limitation", "hypothesis", "future_work"):
                        claims.append({
                            "claim": claim_text,
                            "claim_type": claim_type
                        })
            else:
                claims = []
        except Exception as recovery_err:
            logger.error(f"Claim recovery failed: {recovery_err}")
            claims = []
        
    # Inject page number and chunk ID metadata
    for claim in claims:
        if page_number is not None:
            claim["page_number"] = page_number
        if chunk_id is not None:
            claim["chunk_id"] = chunk_id
            
    return claims
