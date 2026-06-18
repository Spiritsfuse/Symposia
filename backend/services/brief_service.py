from services.llm_service import llm_provider

def generate_research_brief(syntheses: list[dict]) -> str:
    if not syntheses:
        return "No synthesis data available to generate a research brief."
        
    prompt = f"""
You are an expert research analyst.

Using the synthesis data below, generate a professional, structured research brief in Markdown.

Include the following sections exactly:
1. Executive Summary
2. Key Findings by Theme
3. Areas of Consensus (with strength indicators)
4. Areas of Conflict or Contradiction
5. Research Gaps & Open Questions
6. Recommended Future Research

Format the output nicely using Markdown headers (e.g. #, ##, ###), bold highlights, and bullet points.
Every finding or claim should cite its source page and chunk (e.g., [Page X, Chunk Y]) where applicable based on the synthesis data.

Synthesis Data:
{syntheses}
"""

    response_text = llm_provider.generate_text(
        prompt=prompt,
        temperature=0.2
    )

    return response_text
