const User = require("../models/model");

const getUsers = async (req, res) => {
    User.find()
        .then(reponse =>{
            res.json(reponse);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

const addUser = async (req, res) => {
    const user = new User({
        id: req.body.id,
        name: req.body.name,
    });
    user.save()
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.status(201).json({ message: error.message });
        });
}

const updateUser = async (req, res) => {
    const {id,name} = req.body;
    User.updateOne({id: id}, {name: name})
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.status(200).json({ message: error.message });
        });
}

const deleteUser = async (req, res) => {
    const {id} = req.body;
    User.deleteOne({id: id})
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.status(200).json({ message: error.message });
        });
}


module.exports = { getUsers, addUser, updateUser, deleteUser };