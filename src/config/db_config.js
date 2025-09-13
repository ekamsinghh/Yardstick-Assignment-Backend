const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to Database');
    } catch (err) {
        console.error("Error connecting to database");
        process.exit(1);
    }
};

module.exports = connectDB;
