const express = require('express')
const router = express.Router()
const multer = require('multer')
const { verifyToken, verifyAdminToken } = require('../middlewares/verifyToken')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.filename)
    }
})

const upload = multer({
    storage: storage
})

router.post('/image', upload.single('image'), (req, res) => {
    try {
        return res.status(201).json({ message: "successfully uploaded file" })
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = router