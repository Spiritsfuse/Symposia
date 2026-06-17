from services.brief_service import (
    generate_research_brief
)


sample_synthesis = [
    {
        "theme":
        "Benefits of Retrieval",

        "consensus":
        "strong",

        "claims": [
            "RAG reduces hallucinations",
            "Retrieval improves factual accuracy",
            "Retrieval methods improve grounding"
        ]
    },

    {
        "theme":
        "Prompt Engineering",

        "consensus":
        "moderate",

        "claims": [
            "Chain of thought improves reasoning",
            "Prompt decomposition improves accuracy"
        ]
    }
]

brief = generate_research_brief(
    sample_synthesis
)

print(brief)

with open(
    "data/research_brief.md",
    "w",
    encoding="utf-8"
) as f:

    f.write(brief)
