const mongoose = require("mongoose");


// CONNECTION
async function connectMongoDb(url){
    if (!url) {
        throw new Error("MongoDB connection string is required");
    }

    return mongoose.connect(url);
}

module.exports = {
    connectMongoDb,
};
