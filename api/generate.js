export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    const { ad } = req.body;

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
            content: "You are a CRO expert who creates high-converting landing page sections."
          },
          {
            role: "user",
            content: `
Return ONLY valid JSON.

Ad: ${ad}

Generate a personalized landing page section.

Format:
{
  "headline": "...",
  "description": "...",
  "bullets": ["...", "...", "..."],
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
    const aiText = data.choices?.[0]?.message?.content || "";

    let parsed;

    try {
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      parsed = {
        headline: "Smart Personalized Experience",
        description: "This page adapts based on your needs.",
        bullets: [
          "Better alignment with your goals",
          "Improved user experience",
          "Higher conversion potential"
        ],
        cta: "Get Started",
        score: 75,
        reason: "Fallback used due to parsing issue"
      };
    }

    const bulletsHTML = parsed.bullets
      ? parsed.bullets.map(b => `<li>✅ ${b}</li>`).join("")
      : "";

    const result = `
      <section>
        <h1>${parsed.headline}</h1>
        <p>${parsed.description}</p>

        <ul style="margin-top:10px;">
          ${bulletsHTML}
        </ul>

        <button style="padding:10px 20px;background:#4f46e5;color:white;border:none;border-radius:5px;margin-top:10px;">
          ${parsed.cta}
        </button>
      </section>
    `;

    res.status(200).json({
      result,
      score: parsed.score,
      reason: parsed.reason
    });

  } catch (err) {
    res.status(200).json({
      result: `
        <section>
          <h1>Optimized Experience</h1>
          <p>This page has been personalized based on your ad.</p>
          <ul>
            <li>Better targeting</li>
            <li>Improved messaging</li>
            <li>Stronger CTA</li>
          </ul>
          <button>Get Started</button>
        </section>
      `,
      score: 70,
      reason: "Fallback due to API error."
    });
  }
}
