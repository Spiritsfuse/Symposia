from services.llm_service import client


def generate_theme(claims):

    claims_text = "\n".join(claims)

    prompt = f"""
You are a research analyst.

Generate a short theme name
for the following research claims.

Claims:

{claims_text}

Return ONLY the theme name.
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
    )

    return response.choices[0].message.content.strip()


def get_consensus_strength(count):

    if count >= 4:
        return "strong"

    if count >= 2:
        return "moderate"

    return "weak"


def create_synthesis(claims):

    theme = generate_theme(claims)

    synthesis = {
        "theme": theme,
        "supporting_claims": len(claims),
        "consensus": get_consensus_strength(len(claims)),
        "claims": claims,
    }

    return synthesis
