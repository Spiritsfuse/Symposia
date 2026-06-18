from services.llm_service import llm_provider

def generate_theme(claims: list[str]) -> str:
    if not claims:
        return "General Claims"
        
    claims_text = "\n".join(f"- {c}" for c in claims)

    prompt = f"""
You are a research analyst.

Generate a short, concise theme name (under 6 words)
for the following research claims.

Claims:
{claims_text}

Return ONLY the theme name. Do not include quotes or punctuation.
"""

    response_text = llm_provider.generate_text(
        prompt=prompt,
        temperature=0.0
    )

    return response_text.strip().strip('"').strip("'")


def get_consensus_strength(count: int) -> str:
    if count >= 4:
        return "strong"
    if count >= 2:
        return "moderate"
    return "weak"


def create_synthesis(claims: list[str]) -> dict:
    theme = generate_theme(claims)

    synthesis = {
        "theme": theme,
        "supporting_claims": len(claims),
        "consensus": get_consensus_strength(len(claims)),
        "claims": claims,
    }

    return synthesis
