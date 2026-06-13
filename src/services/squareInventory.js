// Square Inventory Service
// Wire VITE_SQUARE_API_BASE in .env to your backend URL when ready.
// All real API calls are stubbed with comments — swap out the mock block below.

const SQUARE_API_BASE = import.meta.env.VITE_SQUARE_API_BASE ?? "/api/square";

// Placeholder mock counts keyed by squareCatalogId.
// Replace values with real Square Catalog Item Variation IDs once the backend is live.
const MOCK_INVENTORY = {
    "wbcc-tusk-bone": 50,
    "wbcc-desert-rat": 50,
    "wbcc-dark-roast": 50,
    "wbcc-first-light": 50,
    "wbcc-raven-vii": 50,
    "wbcc-smoke-gunpowder": 50,
};

/**
 * Fetch inventory counts for all catalog items.
 * Returns: { [squareCatalogId]: number }
 *
 * Square backend endpoint (when ready):
 *   GET /api/square/inventory
 *   Response: { counts: { [catalogObjectId]: number } }
 */
export async function fetchInventoryCounts() {
    // --- Uncomment when Square backend is live ---
    // const res = await fetch(`${SQUARE_API_BASE}/inventory`);
    // if (!res.ok) throw new Error(`Square inventory fetch failed: ${res.status}`);
    // const data = await res.json();
    // return data.counts;

    // Mock — remove once backend is connected
    return new Promise((resolve) => setTimeout(() => resolve({ ...MOCK_INVENTORY }), 250));
}

/**
 * Fetch inventory count for a single catalog item.
 * Returns: { count: number }
 *
 * Square backend endpoint (when ready):
 *   GET /api/square/inventory/:catalogObjectId
 *   Response: { count: number }
 */
export async function fetchInventoryForItem(catalogItemId) {
    // --- Uncomment when Square backend is live ---
    // const res = await fetch(`${SQUARE_API_BASE}/inventory/${catalogItemId}`);
    // if (!res.ok) throw new Error(`Square inventory fetch failed: ${res.status}`);
    // return res.json();

    // Mock — remove once backend is connected
    return { count: MOCK_INVENTORY[catalogItemId] ?? 0 };
}
