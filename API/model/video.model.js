const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    vidURL: {
        type: String,
        required: true
    },
    transcript: {
        type: String
    },
    timeStamps: [{
        type: String
    }]
})

const videoModel = new mongoose.Schema('video', videoSchema)

module.exports = videoModel