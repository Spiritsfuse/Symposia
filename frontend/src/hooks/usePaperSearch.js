import { useQuery } from "@tanstack/react-query";
import { searchPapers } from "../services/paperService";

export function usePaperSearch(query) {
  return useQuery({
    queryKey: ["paperSearch", query],
    queryFn: () => searchPapers(query),
    enabled: Boolean(query),
  });
}
