const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require("mongoose");
const router = require("./routes/router");

app.use(cors());
app.use(express.json());
    
const uri = 'mongodb+srv://lakshanhim:lakshanhim@cluster0.wry3cix.mongodb.net/?appName=Cluster0'

const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connect();

const server = app.listen(3000, '127.0.0.1', () => {
    console.log("Server is running on port 3000");
});

app.use('/api', router);