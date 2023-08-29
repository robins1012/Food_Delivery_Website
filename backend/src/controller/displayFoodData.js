const express = require('express')
const router = express.Router()
const foodModel = require('../models/Food')
const foodCategoryModel = require('../models/FoodCategory')
const Order = require('../models/Orders')
const Message = require('../models/Message')
const { verifyToken, verifyTokenAdmin } = require('../middlewares/verifyToken')

//food data
router.get('/foodData', async (req, res) => {
    try {
        const food = await foodModel.find(req.query);
        const foodcategory = await foodCategoryModel.find(req.query);

        global.food_items = food
        global.food_category = foodcategory
        res.status(200).json([global.food_category, global.food_items]);
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//orderData
router.post('/orderData', verifyToken, async (req, res) => {
    let data = req.body.order_data

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })
    console.log(eId)
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [{ orderDetails: data, totalPrice: req.body.totalPrice }]
            }).then(() => {
                res.status(200).json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error" + error.message)
        }
    }
    else {
        try {
            eId.order_data.push({ orderDetails: data, totalPrice: req.body.totalPrice });
            await eId.save();
            res.status(200).json({ success: true })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error" + error.message)
        }
    }
})

//MyOrderData
router.post('/myOrderData', verifyToken, async (req, res) => {
    try {
        let eId = await Order.findOne({ 'email': req.body.email })
        console.log(eId)
        console.log(eId.email)
        console.log(eId.order_data)
        console.log(eId.totalPrice)
        res.status(200).json(eId)
    } catch (error) {
        res.send("Error" + error.message)
    }
});

//order
router.post('/orderData', verifyTokenAdmin, async (req, res) => {
    try {
        console.log("email is " + req.body.email);
        let eId = await Order.findOne({ 'email': req.body.email })
        res.status(200).json(eId)
    } catch (error) {
        res.send("Error" + error.message)
    }
});

//my Message
router.post('/messageData', verifyTokenAdmin, async (req, res) => {
    try {
        console.log("email is " + req.body.email)
        let eId = await Message.findOne({ 'email': req.body.email })
        console.log("EID is " + eId)
        res.status(200).json(eId)
    } catch (error) {
        res.send("Error" + error.message)
    }
});

//getAllOrders
router.get('/getAllOrders', verifyTokenAdmin, async (req, res) => {
    try {
        const data = await Order.find();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//getAllMessages
router.get('/getAllMessages', verifyTokenAdmin, async (req, res) => {
    try {
        const data = await Message.find();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method -- Message
router.delete('/deleteMessage/:id', verifyTokenAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        console.log("message id is " + id)
        const data = await Message.findByIdAndDelete(id)
        res.status(200).json(`Document with ${data.email} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Delete by ID Method -- Order
router.delete('/deleteOrder/:id', verifyTokenAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        console.log("order id " + id)
        const data = await Order.findByIdAndDelete(id)
        res.status(200).json(`Document with ${data.email} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router