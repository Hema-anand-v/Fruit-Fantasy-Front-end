import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: string;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!url) return; // Avoid fetching when URL is empty

    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError("");

    async function fetchData() {
      try {
        const response = await axios.get<T>(url, { signal });
        setData(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.code === "ERR_CANCELED") {
            console.log("Request canceled:", url);
          } else if (err.response) {
            setError(`Server error: ${err.response.status}`);
          } else if (err.request) {
            setError("Network error. Please check your connection.");
          } else {
            setError(err.message);
          }
        } else {
          setError("Unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort(); // Cancel request on cleanup
    };
  }, [url]);

  return { data, loading, error };
}
