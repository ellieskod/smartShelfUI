export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiBaseUrl = process.env.THIRD_PARTY_API_BASE_URL;
  const apiToken = process.env.THIRD_PARTY_API_TOKEN;

  if (!apiBaseUrl || !apiToken) {
    return res.status(500).json({
      error: "Missing server environment variables",
    });
  }

  try {
    const upstreamRes = await fetch(`${apiBaseUrl}/data`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        Accept: "application/json",
      },
    });

    if (!upstreamRes.ok) {
      return res.status(upstreamRes.status).json({
        error: "Third-party API request failed",
      });
    }

    const data = await upstreamRes.json();

    return res.status(200).json({
      source: "vercel-serverless",
      data,
    });
  } catch {
    return res.status(502).json({
      error: "Failed to reach third-party API",
    });
  }
}
