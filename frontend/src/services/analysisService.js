import { api } from "./api";

function validateAnalysisResponse(data) {
  const hasExpectedShape =
    data &&
    Array.isArray(data.claims) &&
    data.synthesis &&
    typeof data.synthesis === "object" &&
    typeof data.research_brief === "string";

  if (!hasExpectedShape) {
    console.error("Unexpected analysis response:", data);
    throw new Error("Paper analysis returned an unexpected response.");
  }

  return data;
}

export async function analyzePaper(file, onUploadProgress) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/analyze-paper", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });

  return validateAnalysisResponse(response.data);
}
