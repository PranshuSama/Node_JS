const express = require("express")
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

// Middleware - Plugins
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get("/users" , (req,res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    <ul>
    `;
    res.send(html);

})

//REST APIs
app.get("/api/users", (req,res) => {
    return res.json(users);
});

app
    .route("/api/users/:id")
    .get((req,res) => {
        const Id = Number(req.params.id);
        const user = users.find(user => user.id === Id);
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
    .delete((req,res) => {
        const Id = Number(req.params.id);
        const userIndex = users.findIndex(user => user.id === Id);

        if (userIndex === -1) {
            return res.status(404).json({status: "User not found"});
        }

        users.splice(userIndex, 1);
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            return res.json({status: "success"});
        });
    }
);

app.post("/api/users", (req,res) => {
    // TODO : create a new user with id
    const body = req.body;
    users.push({id: users.length + 1 , ...body});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        return res.json({status : "sucess", id : users.length});
    });
});

app.listen(PORT, () => console.log(`Server is started at PORT: ${PORT}`));