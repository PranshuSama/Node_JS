const { nanoid } = require("nanoid");
const URL = require("../models/url");


async function handleGenerateNewShortURL (req,res) {
    const body = req.body;
    if (!body || !body.url) {
        return res.status(400).json({ message : "url is required" });
    }
    const shortID = nanoid(8);
    await URL.create({
        shortId : shortID,
        redirectedURL : body.url,
        visistedHistory : [],
    });

    return res.json({ id : shortID });
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    return res.json({
        totalClicks : result.visistedHistory.length,
        analytics : result.visistedHistory,
    })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};