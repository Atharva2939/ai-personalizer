export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { ad, url } = req.body;

    const result = `
      <h2>Personalized Landing Page</h2>
      <p><b>Ad:</b> ${ad}</p>
      <p><b>Original URL:</b> ${url}</p>

      <h3>Optimized Changes:</h3>
      <ul>
        <li>Headline aligned with ad messaging</li>
        <li>CTA improved for conversions</li>
        <li>Trust signals added</li>
        <li>Content personalized to user intent</li>
      </ul>
    `;

    res.status(200).json({ result });

  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
