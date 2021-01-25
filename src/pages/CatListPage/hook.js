import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";

export function useComponent() {
  const [cats, setCats] = useState([]);
  const { loading, request, clearError } = useHttp();

  useEffect(() => {
    fetchRecentCatImages(request, setCats);
    return () => clearError();
  }, [clearError, request]);
  return { loading, cats };
}
const fetchRecentCatImages = async (request, setCats) => {
  const fetched = await request(
    "get",
    null,
    null,
    "https://api.thecatapi.com/v1/images?limit=4",
  );
  setCats(fetched);
};
