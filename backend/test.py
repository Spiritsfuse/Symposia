from services.claim_service import extract_claims


sample_text = """
We evaluated our retrieval augmented generation system
on three benchmark datasets.

Results showed a 35% reduction in hallucinations
compared to baseline language models.

A limitation of this work is that only English
datasets were evaluated.

We hypothesize that larger retrieval corpora
could further improve factual accuracy.

Future work should investigate multilingual settings.
"""


claims = extract_claims(sample_text)

print(claims)