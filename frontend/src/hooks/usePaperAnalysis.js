import { useMutation } from "@tanstack/react-query";
import { analyzePaper } from "../services/analysisService";

export function usePaperAnalysis({ onUploadProgress } = {}) {
  return useMutation({
    mutationKey: ["analyzePaper"],
    mutationFn: (file) => analyzePaper(file, onUploadProgress),
  });
}
