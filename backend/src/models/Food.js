const mongoose = require('mongoose')
const FoodSchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    options: [
        {
            type: Object,
            required: true
        }
    ],
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('food', FoodSchema)