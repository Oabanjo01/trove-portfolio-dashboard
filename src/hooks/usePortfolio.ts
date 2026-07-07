import { useCallback, useEffect, useState } from "react";
import { getPortfolio } from "../services/portfolio";
import type { Portfolio } from "../types/portfolio";

export function usePortfolio() {
  const [data, setData] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async (ignore = false) => {
    try {
      if (!ignore) {
        setLoading(true);
        setError(null);
      }

      const portfolio = await getPortfolio();

      if (!ignore) {
        setData(portfolio);
      }
    } catch (err) {
      if (!ignore) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    } finally {
      if (!ignore) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const portfolio = await getPortfolio();

        if (!ignore) {
          setData(portfolio);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error ? err.message : "Something went wrong."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    data,
    loading,
    error,
    refetch: () => fetchPortfolio(),
  };
}

export default usePortfolio;
