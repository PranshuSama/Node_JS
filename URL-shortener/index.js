const express = require("express")
const path = require("path");
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connection");

const staticRouter = require("./routes/staticRouter");


const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDb connected!"));

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", staticRouter);

app.use("/url", urlRoute);
app.use("/:shortId", async(req,res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, { $push : {
        visistedHistory : { timestamp : Date.now() },
    } })

    if (!entry) {
        return res.status(404).json({ message: "short url not found" });
    }

    res.redirect(entry.redirectedURL);
})

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));