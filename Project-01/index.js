const express = require("express")
const fs = require("fs");
const mongoose = require("mongoose");
const { error } = require("console");

const app = express();
const PORT = 8000;

// CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/my-first-project")
        .then( () => console.log("MongoDB is Connected!"))
        .catch((error) => console.log("Mongo error: ", error));


// SCHEMA
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    jobTitle : {
        type : String,
    },
    gender : {
        type : String,
    },

}, {timestamps : true}
);

// MODEL
const User = mongoose.model("user",userSchema);



// Middleware - Plugins
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get("/users" , async(req,res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email} </li>`)
        .join("")}
    </ul>
    `;
    res.send(html);

})

//REST APIs
app.get("/api/users", async(req,res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});

app
    .route("/api/users/:id")
    .get(async (req,res) => {
        const userId = req.params.id.trim();

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "invalid user id" });
        }

        const user = await User.findById(userId);
        if(!user) return res.status(404).json({error : "user not found!"});
        res.json(user);
    })
    .patch((req,res) => {
        const Id = Number(req.params.id);
        const body = req.body;
        const user = users.find(user => user.id === Id);

        if (!user) {
            return res.status(404).json({status: "User not found"});
        }

        Object.assign(user, body);
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            return res.json({status: "success"});
        });
    })
    .delete(async (req,res) => {
        const userId = req.params.id.trim();

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "invalid user id" });
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ status: "User not found" });
        }

        return res.json({ status: "success" });
    }
);

app.post("/api/users", async(req,res) => {
    // TODO : create a new user with id
    const body = req.body;
    if(!body || !body.email || !body.gender || !body.last_name || !body.first_name || !body.job_title){
        return res.status(400).json({error : "all fields are necessary!"});
    }
    const result = await User.create({
        firstName : body.first_name,
        lastName : body.last_name,
        email : body.email,
        gender : body.gender,
        jobTitle : body.job_title,
    });

    console.log("result : ",result);
    return res.status(201).json({msg : "success!"});
    
    
});

app.listen(PORT, () => console.log(`Server is started at PORT: ${PORT}`));