import { useState, useEffect } from "react";

export function useAvailability() {
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/catalog")
      .then((r) => r.json())
      .then((data) => {
        const map = {};
        for (const item of data.availability || []) {
          map[item.variationId] = item;
        }
        setAvailability(map);
      })
      .catch(() => {
        // On error, treat all products as in-stock so the site stays usable
      })
      .finally(() => setLoading(false));
  }, []);

  return { availability, loading };
}
