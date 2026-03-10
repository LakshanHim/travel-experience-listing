const mongoose = require('mongoose');

const Scheema = mongoose.Schema;

const userScheema = new Scheema({
    id: Number,
    name: String,
});

const User = mongoose.model("User", userScheema);

module.exports = User;