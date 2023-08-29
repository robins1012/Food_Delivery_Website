const mongoose = require('mongoose')
const FoodCategorySchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('foodcategory', FoodCategorySchema)