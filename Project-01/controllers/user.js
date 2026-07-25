const mongoose = require("mongoose");
const User = require("../models/user");

async function handleGetAllUsers(req,res){
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
};

async function handleGetUserById(req,res) {
    const userId = req.params.id.trim();

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "invalid user id" });
        }

        const user = await User.findById(userId);
        if(!user) return res.status(404).json({error : "user not found!"});
        res.json(user);
};

async function handleUpdateUserById(req,res) {
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
};

async function handleDeleteUserById(req,res) {
    const userId = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "invalid user id" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
        return res.status(404).json({ status: "User not found" });
    }

    return res.json({ status: "success" });
};

async function handleCreateNewUser(req,res) {
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
    return res.status(201).json({msg : "success!", id : result._id});
};

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}