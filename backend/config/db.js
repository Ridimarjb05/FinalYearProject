const mongoose = require('mongoose');

const connectDB = () => {
    const mongo_url = process.env.MONGO_CONN;
    
    mongoose.connect(mongo_url)
        .then(() => {
            console.log("Connected to MongoDB ")
        }).catch((err) => {
            console.log("Error connecting to MongoDB:", err);
        })
}

module.exports = connectDB;