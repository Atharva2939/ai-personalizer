export default async function handler(req, res) {
  const { ad, url } = req.body;

  const result = `
    <h2>Personalized Landing Page</h2>
    <p><b>Ad:</b> ${ad}</p>
    <p><b>Original URL:</b> ${url}</p>

    <h3>Changes:</h3>
    <ul>
      <li>Headline aligned with ad</li>
      <li>CTA optimized</li>
      <li>Better trust signals</li>
      <li>Improved messaging match</li>
    </ul>
  `;

  res.status(200).json({ result });
}