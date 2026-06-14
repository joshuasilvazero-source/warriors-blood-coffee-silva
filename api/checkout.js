export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;

  if (!token || !locationId) {
    return res.status(500).json({ error: "Square credentials not configured" });
  }

  const { cartItems } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const lineItems = cartItems.map((item) => ({
    quantity: String(item.quantity),
    catalog_object_id: item.variationId,
  }));

  const origin = req.headers.origin ||
    (req.headers.host ? `https://${req.headers.host}` : "https://warriorsbloodcoffee.com");

  try {
    const response = await fetch(
      "https://connect.squareup.com/v2/online-checkout/payment-links",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Square-Version": "2024-01-18",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idempotency_key: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          order: {
            location_id: locationId,
            line_items: lineItems,
          },
          checkout_options: {
            redirect_url: `${origin}/payment-success`,
          },
        }),
      }
    );

    if (!response.ok) {
      return res.status(502).json({ error: "Square API error" });
    }

    const data = await response.json();

    if (data.errors) {
      return res.status(502).json({ error: data.errors[0]?.detail || "Checkout failed" });
    }

    return res.status(200).json({ url: data.payment_link.url });
  } catch {
    return res.status(502).json({ error: "Failed to reach Square API" });
  }
}
