import { useState, useCallback } from "react";
import { useHttp } from "../../hooks/http.hook";

export function useGetRecentCats() {
  const [cats, setCats] = useState([]);
  const { loading, request, clearError } = useHttp();

  const fetchRecentCatImages = useCallback(async () => {
    const fetched = await request(
      "get",
      null,
      null,
      "https://api.thecatapi.com/v1/images?limit=4",
    );

    setCats(fetched);
  }, [request]);

  return { cats, loading, clearError, fetchRecentCatImages };
}
