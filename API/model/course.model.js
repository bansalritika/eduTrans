const mongoose = require('mongoose')

const courseSchema  = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    videos: [{
        type: mongoose.Schema.ObjectId,
        ref: 'video'
    }]
})

const courseModel = new mongoose.model('course', courseSchema)

module.exports = {courseModel}