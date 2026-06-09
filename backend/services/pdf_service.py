import fitz 


def extract_pdf_pages(pdf_path: str):
    
    document = fitz.open(pdf_path)

    pages = []

    for page_num in range(len(document)):

        page = document[page_num]

        pages.append(
            {
                "page_number": page_num + 1,
                "content": page.get_text()
            }
        )

    return pages


def extract_pdf_text(pdf_path: str):
    return extract_pdf_pages(pdf_path)
