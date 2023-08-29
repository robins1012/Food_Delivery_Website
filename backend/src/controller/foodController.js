const express = require('express')
const router = express.Router()
const foodModel = require('../models/Food')

const { verifyToken, verifyTokenAdmin } = require('../middlewares/verifyToken')

//getAll
router.get('/getAll', async (req, res) => {
    try {
        const products = await foodModel.find(req.query);
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//getOne
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await foodModel.findById(req.params.id);
        if (!data) {
            return res.status(500).json({ message: "NO product with such ID" });
        }
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//create food product
router.post('/', async (req, res) => {
    try {
        const newProduct = await foodModel.create({ ...req.body });
        return res.status(201).json(newProduct);
    }
    catch (err) {
        console.log(err);
    }
})

//Delete food by ID Method
router.delete('/delete/:id', verifyTokenAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await foodModel.findByIdAndDelete(id)
        res.status(200).json(`Document has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', verifyTokenAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await foodModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.status(200).json(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router