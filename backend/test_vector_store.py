from services.vector_service import add_claim, search_claims

print("Testing insertion...")
add_claim(
    claim_id="claim_test_1",
    claim_text="Retrieval augmented generation systems show a 35% reduction in hallucination rates compared to standard baselines.",
    metadata={"source_file": "test_doc.pdf", "page_number": 1, "claim_type": "finding"}
)
print("Stored Successfully")

print("Testing vector query...")
results = search_claims("hallucination reduction", n_results=1)
print("Query Results:")
print(results)

if results and "documents" in results and len(results["documents"][0]) > 0:
    print("Test passed: Retrieval succeeded!")
else:
    print("Test failed: Retrieval returned empty or incorrect shape.")