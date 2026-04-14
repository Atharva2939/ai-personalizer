export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    const { ad, url } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a CRO expert who personalizes landing pages based on ad creatives."
          },
          {
            role: "user",
            content: `
Return ONLY valid JSON. No explanation.

Ad Creative: ${ad}
Landing Page: ${url}

Format:
{
  "headline": "...",
  "description": "...",
  "cta": "...",
  "score": 85,
  "reason": "..."
}
`
          }
        ]
      })
    });

    const data = await response.json();

    // ✅ Only ONE declaration
    const aiText = data.choices?.[0]?.message?.content || "";

    // ✅ Safe JSON extraction
    let parsed;

    try {
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found");
      parsed = JSON.parse(jsonMatch[0]);
    } catch (e) {
      return res.status(500).json({
        error: "Failed to parse AI response",
        raw: aiText
      });
    }

    // ✅ Build HTML output
    const result = `
      <h1>${parsed.headline}</h1>
      <p>${parsed.description}</p>
      <button style="padding:10px 20px;background:#4f46e5;color:white;border:none;border-radius:5px;">
        ${parsed.cta}
      </button>

      <hr/>

      <h4>🔧 CRO Improvements:</h4>
      <ul>
        <li>Message aligned with ad intent</li>
        <li>Clear value proposition</li>
        <li>Strong CTA added</li>
        <li>Improved user targeting</li>
      </ul>
    `;

    res.status(200).json({
      result,
      score: parsed.score,
      reason: parsed.reason
    });

  } catch (err) {
    res.status(500).json({
      error: "AI generation failed",
      details: err.message
    });
  }
}
