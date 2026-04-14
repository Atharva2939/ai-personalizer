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
Ad Creative: ${ad}
Landing Page: ${url}

Generate:
1. A high-converting headline
2. A short description
3. A strong CTA
4. A conversion score out of 100
5. Reason for the score

Return JSON like:
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
    const aiText = data.choices[0].message.content;

    // Convert AI text to JSON safely
    const parsed = JSON.parse(aiText);

    const result = `
      <h1>${parsed.headline}</h1>
      <p>${parsed.description}</p>
      <button style="padding:10px 20px;background:#4f46e5;color:white;border:none;border-radius:5px;">
        ${parsed.cta}
      </button>
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
