import { api } from "./api";

function validatePaperSearchResponse(data) {
  if (!Array.isArray(data)) {
    console.error("Unexpected paper search response:", data);
    throw new Error("Paper search returned an unexpected response.");
  }

  data.forEach((paper) => {
    const hasRequiredFields =
      typeof paper.title === "string" &&
      Array.isArray(paper.authors) &&
      typeof paper.summary === "string" &&
      typeof paper.published === "string" &&
      typeof paper.pdf_url === "string";

    if (!hasRequiredFields) {
      console.error("Unexpected paper item:", paper);
      throw new Error("Paper search results do not match the expected format.");
    }
  });

  return data;
}

export async function searchPapers(query) {
  const response = await api.get("/papers/search", {
    params: { query },
  });

  return validatePaperSearchResponse(response.data);
}
