import { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useMessage } from "../../hooks/message.hook";

export function useComponent() {
  const [cats, setCats] = useState([]);
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();

  const fetchCats = useCallback(async () => {
    try {
      const fetched = await request(
        "get",
        null,
        null,
        "https://api.thecatapi.com/v1/images?limit=4",
      );
      setCats(fetched);
    } catch (e) {
      message(error);
    }
  }, []);

  useEffect(() => {
    fetchCats();

    return () => clearError();
  }, [fetchCats]);

  return { loading, cats };
}
