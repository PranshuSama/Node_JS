const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  const originalUrl = body?.url || body?.redirectedURL;

  if (!originalUrl) {
    return res.status(400).json({ message: "url is required" });
  }
  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectedURL: originalUrl,
    visistedHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", { id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visistedHistory.length,
    analytics: result.visistedHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
