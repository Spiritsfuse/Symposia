import os
import fitz
from services.pdf_service import extract_pdf_pages
from services.chunk_service import create_chunks_from_pages
from services.claim_service import extract_claims
from services.synthesis_service import create_synthesis
from services.brief_service import generate_research_brief
from services.vector_service import delete_claims_by_metadata, add_claims_batch, search_claims

def test_full_pipeline():
    test_pdf_path = "integration_test_paper.pdf"
    
    print("\n--- Step 1: Creating Dummy PDF ---")
    doc = fitz.open()
    page = doc.new_page()
    text = (
        "We evaluated our retrieval augmented generation system on three benchmark datasets. "
        "Results showed a 35% reduction in hallucinations compared to baseline language models. "
        "A limitation of this work is that only English datasets were evaluated. "
        "We hypothesize that larger retrieval corpora could further improve factual accuracy. "
        "Future work should investigate multilingual settings."
    )
    page.insert_text((50, 50), text)
    doc.save(test_pdf_path)
    doc.close()
    print(f"Created {test_pdf_path}")
    
    try:
        print("\n--- Step 2: Running PDF Extraction ---")
        pages = extract_pdf_pages(test_pdf_path)
        print(f"Extracted {len(pages)} page(s).")
        assert len(pages) == 1
        
        print("\n--- Step 3: Running Chunking ---")
        chunks = create_chunks_from_pages(pages)
        print(f"Created {len(chunks)} chunk(s).")
        assert len(chunks) > 0
        
        print("\n--- Step 4: Claim Extraction ---")
        all_claims = []
        for chunk in chunks:
            claims = extract_claims(chunk["content"], chunk["page_number"], chunk["chunk_id"])
            all_claims.extend(claims)
        
        print(f"Extracted {len(all_claims)} claims:")
        for claim in all_claims:
            print(f"  - [{claim['claim_type']}] {claim['claim']}")
            
        assert len(all_claims) >= 1
        
        print("\n--- Step 5: Cleaning and Inserting to Vector Store ---")
        delete_claims_by_metadata({"source_file": test_pdf_path})
        
        ids = [f"{test_pdf_path}_claim_{i}" for i in range(len(all_claims))]
        texts = [c["claim"] for c in all_claims]
        metadatas = [{
            "source_file": test_pdf_path,
            "page_number": c.get("page_number", 1),
            "chunk_id": c.get("chunk_id", ""),
            "claim_type": c.get("claim_type", "claim")
        } for c in all_claims]
        
        add_claims_batch(ids, texts, metadatas)
        print("Claims indexed in vector database.")
        
        print("\n--- Step 6: Testing Vector Query ---")
        results = search_claims("hallucination reduction", n_results=1)
        print("Search Results:")
        print(results)
        
        found = False
        if results and "documents" in results and results["documents"] and len(results["documents"][0]) > 0:
            found = True
        assert found, "Could not find the target claim in vector search results!"
        print("Vector query verified successfully!")
        
        print("\n--- Step 7: Cross-Paper Synthesis ---")
        claim_texts = [c["claim"] for c in all_claims]
        synthesis = create_synthesis(claim_texts)
        print("Synthesis Theme:", synthesis["theme"])
        print("Consensus Strength:", synthesis["consensus"])
        
        print("\n--- Step 8: Brief Generation ---")
        brief = generate_research_brief([synthesis])
        print("Brief preview:")
        print("\n".join(brief.split("\n")[:10]))
        
        print("\n=== INTEGRATION TEST PASSED SUCCESSFULLY! ===")
        
    finally:
        # Clean up
        if os.path.exists(test_pdf_path):
            os.remove(test_pdf_path)
            print(f"\nRemoved temporary file {test_pdf_path}")
            
if __name__ == "__main__":
    test_full_pipeline()
