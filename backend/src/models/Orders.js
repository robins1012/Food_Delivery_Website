const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: [
        {
            orderDate: {
                type: Date,
                default: Date.now
            }, orderDetails: {
                type: Array,
                required: true
            },
            totalPrice: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('Order', OrderSchema)