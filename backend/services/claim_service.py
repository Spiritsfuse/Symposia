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


def extract_claims(chunk_text: str):

    prompt = PROMPT.format(text=chunk_text)

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
    )

    result = response.choices[0].message.content

    return result
