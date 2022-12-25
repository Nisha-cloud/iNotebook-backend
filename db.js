const mongoose = require('mongoose')
const mongoURL = "mongodb+srv://Nisha19:Nishaniket19@cluster0.hw95bfq.mongodb.net/test"
const mongoConnect = () => {
    mongoose.connect(mongoURL, () => {
        console.log('DB connection successfull')
    })
}

module.exports = mongoConnect