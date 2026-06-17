from services.llm_service import client


def generate_research_brief(
    syntheses
):

    prompt = f"""
You are an expert research analyst.

Using the synthesis data below,
generate a professional research brief.

Include:

1. Executive Summary

2. Key Findings

3. Areas of Consensus

4. Areas of Conflict

5. Research Gaps

6. Recommended Future Research

Synthesis Data:

{syntheses}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content
