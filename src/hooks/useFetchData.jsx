import { useEffect, useState } from "react";
import { token } from "../config";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const text = await res.text();
        let result;
        try {
          result = JSON.parse(text);
        } catch (parseError) {
          throw new Error(`Unable to parse JSON: ${text}`);
        }

        if (!res.ok) {
          throw new Error(result.message || "Failed to fetch data");
        }

        setData(result.data || []);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message || "Failed to fetch data");
      }
    };

    fetchData();
  }, [url, token]); // Include token in the dependency array if it can change

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
