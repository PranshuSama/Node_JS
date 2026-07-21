const express = require("express")
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

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
        // TODO : edit user with id
        return res.json({status : "Pending"});
    })
    .delete((req,res) => {
        // TODO : delete user with id
        return res.json({status : "Pending"});
    }
);

app.post("/api/users", (req,res) => {
    // TODO : create a new user with id
    return res.json({status : "Pending"});

});

app.listen(PORT, () => console.log(`Server is started at PORT: ${PORT}`));