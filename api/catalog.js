const VARIATION_IDS = [
  "MOZN2I2EDY4GTVAQLX5RCED7", // Tusk & Bone
  "RMQJE4D2ADVMF352WH42QKOH", // Desert Rat
  "2LJWLMGJSY3X6FFODGWGN5HP", // WBCC Dark Roast
  "VIKVABR77RXMD6IQS4NDTONQ", // First Light
  "ZWR3QO3JQESLKPA63UUNSJZ4", // Raven VII
  "BHR2BFOSEXZLCFMW53TE7GV4", // Smoke & Gunpowder
];

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;

  if (!token || !locationId) {
    return res.status(500).json({ error: "Square credentials not configured" });
  }

  const response = await fetch(
    "https://connect.squareup.com/v2/inventory/counts/batch-retrieve",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Square-Version": "2024-01-18",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        catalog_object_ids: VARIATION_IDS,
        location_ids: [locationId],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return res.status(502).json({ error: "Square API error" });
  }

  // Sum IN_STOCK quantities per variation (Square may return multiple entries)
  const stockMap = {};
  for (const count of data.counts || []) {
    if (count.state === "IN_STOCK") {
      stockMap[count.catalog_object_id] =
        (stockMap[count.catalog_object_id] || 0) + parseFloat(count.quantity || "0");
    }
  }

  const availability = VARIATION_IDS.map((id) => ({
    variationId: id,
    quantity: stockMap[id] || 0,
    inStock: (stockMap[id] || 0) > 0,
  }));

  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=30");
  return res.status(200).json({ availability });
}
