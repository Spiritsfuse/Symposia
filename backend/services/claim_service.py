import json

from services.llm_service import client

PROMPT = """
You are a research paper analyst.

Extract the following from the text:

1. Findings
2. Limitations
3. Hypotheses
4. Future Work

Return ONLY valid JSON.

Expected Format:

{{
    "claims": [
        {{
            "claim": "text",
            "claim_type": "finding"
        }}
    ]
}}

Text:
{text}
"""


def extract_claims(chunk_text: str, page_number=None, chunk_id=None):

    prompt = PROMPT.format(text=chunk_text)

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
    )

    result = response.choices[0].message.content.strip()

    if result.startswith("```"):
        result = result.strip("`")
        result = result.removeprefix("json").strip()

    parsed_result = json.loads(result)
    claims = parsed_result.get("claims", [])

    for claim in claims:
        if page_number is not None:
            claim["page_number"] = page_number

        if chunk_id is not None:
            claim["chunk_id"] = chunk_id

    return claims
