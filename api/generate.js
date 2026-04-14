export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { ad, url } = req.body;

  // Simple AI-like logic
  let headline = "Welcome to our platform";
  let cta = "Get Started";
  let description = "Experience something amazing.";

  if (ad.toLowerCase().includes("productivity")) {
    headline = "Boost Your Productivity with an All-in-One Workspace";
    cta = "Start Organizing Now";
    description = "Manage tasks, docs, and teams seamlessly in one place.";
  }

  if (ad.toLowerCase().includes("design")) {
    headline = "Create Stunning Designs in Minutes";
    cta = "Start Designing";
    description = "No skills needed. Just drag, drop, and create.";
  }

  if (ad.toLowerCase().includes("discount")) {
    headline = "Don’t Miss This Limited-Time Offer";
    cta = "Shop Now";
    description = "Grab exclusive deals before they’re gone.";
  }

  const result = `
    <h1>${headline}</h1>
    <p>${description}</p>
    <button style="padding:10px 20px;background:black;color:white;border:none;">
      ${cta}
    </button>

    <hr/>

    <h3>🔧 CRO Improvements Applied:</h3>
    <ul>
      <li>Message match with ad creative</li>
      <li>Clear value proposition</li>
      <li>Stronger CTA</li>
      <li>User intent alignment</li>
    </ul>
  `;

  res.status(200).json({ result });
}
