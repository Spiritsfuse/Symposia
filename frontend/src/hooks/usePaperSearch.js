import { useQuery } from "@tanstack/react-query";
import { searchPapers, searchLibrary } from "../services/paperService";

export function usePaperSearch(query) {
  return useQuery({
    queryKey: ["paperSearch", query],
    queryFn: () => searchPapers(query),
    enabled: Boolean(query),
  });
}

export function useLibrarySearch(query) {
  return useQuery({
    queryKey: ["librarySearch", query],
    queryFn: () => searchLibrary(query),
    enabled: Boolean(query),
  });
}
