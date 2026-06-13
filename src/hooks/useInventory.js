import { useState, useEffect } from "react";
import { fetchInventoryCounts } from "../services/squareInventory";

export function useInventory() {
    const [inventory, setInventory] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        fetchInventoryCounts()
            .then((data) => {
                if (!cancelled) {
                    setInventory(data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(err.message);
                    setLoading(false);
                }
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return { inventory, loading, error };
}
