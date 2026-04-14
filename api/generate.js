export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { ad, url } = req.body;

  let headline, cta, description, score, reason;

  const text = ad.toLowerCase();

  if (text.includes("productivity")) {
    headline = "Boost Your Productivity with an All-in-One Workspace";
    description = "Manage tasks, docs, and teams seamlessly.";
    cta = "Start Organizing";
    score = 85;
    reason = "Strong alignment between ad intent and landing messaging.";
  } 
  else if (text.includes("design")) {
    headline = "Create Stunning Designs in Minutes";
    description = "No skills needed. Drag, drop, and create.";
    cta = "Start Designing";
    score = 88;
    reason = "Clear value proposition and strong visual intent.";
  } 
  else if (text.includes("discount")) {
    headline = "Limited-Time Offer Just for You!";
    description = "Grab exclusive deals before they’re gone.";
    cta = "Shop Now";
    score = 82;
    reason = "Good urgency but can improve trust signals.";
  } 
  else {
    headline = "Welcome to a Better Experience";
    description = "We help you achieve your goals faster.";
    cta = "Get Started";
    score = 70;
    reason = "Generic messaging; personalization improves relevance.";
  }

  const result = `
    <h1>${headline}</h1>
    <p>${description}</p>
    <button style="padding:10px 20px;background:#4f46e5;color:white;border:none;border-radius:5px;">
      ${cta}
    </button>

    <hr/>

    <h4>🔧 CRO Improvements:</h4>
    <ul>
      <li>Message match with ad</li>
      <li>Clear value proposition</li>
      <li>Stronger CTA</li>
      <li>Improved user intent alignment</li>
    </ul>
  `;

  res.status(200).json({ result, score, reason });
}
