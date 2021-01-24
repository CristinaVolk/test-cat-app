import axios from "axios";
import { useState, useCallback } from "react";
import { useMessage } from "./message.hook";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const message = useMessage();

  const request = useCallback(
    async (method, headers, data, url) => {
      try {
        setLoading(true);
        const options = {
          method: method,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "x-api-key": process.env.REACT_APP_THE_CAT_API_ACCESS_KEY,
            ...headers,
          },
          data: data,
          url: url,
        };

        const response = await axios(options);

        if (response.data) {
          setLoading(false);
          return response.data;
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 400) {
            setError(err.response.data.message);
            message(`Error: ${err.response.data.message}`);
          } else if (err.response.status === 500) {
            setError(err.response.data.message);
            message(`Error: ${err.response.data.message}`);
          } else if (err.request) {
            setError(err.request);
            message(`Error: ${err.request}`);
          } else {
            setError(err.message);
            message(`Error: ${err.message}`);
          }
        }
        setLoading(false);
      }
    },
    [message],
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
