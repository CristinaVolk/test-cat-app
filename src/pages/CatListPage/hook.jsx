import { useEffect } from "react";
import { useGetRecentCats } from "./useGetRecentCats";

export function useComponent() {
  const {
    cats,
    loading,
    clearError,
    fetchRecentCatImages,
  } = useGetRecentCats();

  useEffect(() => {
    fetchRecentCatImages();
    return () => clearError();
  }, [clearError, fetchRecentCatImages]);
  return { loading, cats };
}
