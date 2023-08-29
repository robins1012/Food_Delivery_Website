const mongoose = require('mongoose')
const MessageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    messages: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
            },
            phone: {
                type: Number,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('message', MessageSchema)