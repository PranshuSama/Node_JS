const express = require("express")

const {connectMongoDb} = require("./connection")
const {logReqRes} = require("./middlewares");
const userRoute = require("./routes/user")

const app = express();
const PORT = 8000;

//connection
connectMongoDb("mongodb://127.0.0.1:27017/my-first-project").then(() => console.log("MongoDb connected!"));


// Middleware - Plugins
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(logReqRes("log.txt"));

app.use("/api/users", userRoute);


app.listen(PORT, () => console.log(`Server is started at PORT: ${PORT}`));