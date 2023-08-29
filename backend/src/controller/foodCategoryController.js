const express = require('express')
const router = express.Router()
const foodCategoryModel = require('../models/FoodCategory')

const { verifyToken, verifyTokenAdmin } = require('../middlewares/verifyToken')

//getAll
router.get('/getAll', async (req, res) => {
    console.log('wnkdjkfe')
    try {
        const products = await foodCategoryModel.find(req.query);
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//getOne
router.get('/getOne/:id', async (req, res) => {
    console.log("ehefihrifh")
    try {
        const data = await foodCategoryModel.findById(req.params.id);
        if (!data) {
            return res.status(500).json({ message: "NO product with such ID" });
        }
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//create product
router.post('/', async (req, res) => {
    try {
        const newProduct = await foodCategoryModel.create({ ...req.body });
        return res.status(201).json(newProduct);
    }
    catch (err) {
        console.log(err);
    }
})


module.exports = router