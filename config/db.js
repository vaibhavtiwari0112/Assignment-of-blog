const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to MongodB successfully');
    } catch (error) {
        console.log(`Mongo connect error ${error}`)
    }
};

module.exports = connectDB;