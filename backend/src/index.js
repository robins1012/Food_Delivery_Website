const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();
app.use("*", cors({
    origin: true,
    credentials: true
}))
app.use(cookieParser())

const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRoute = require('./controller/authController')
//const uploadRoute = require('./controller/uploadController')
const foodRoute = require('./controller/foodController')
const foodcategoryRoute = require('./controller/foodCategoryController')
const displayData = require('./controller/displayFoodData')

dotenv.config({ path: './config.env' })

require('./db/conn')

//to make req.body accessable otherwise it will be undefined
app.use(bodyParser.json())

app.use('/user', userRoute)
//app.use('/upload', uploadRoute)
app.use('/food', foodRoute)
app.use('/foodcat', foodcategoryRoute)
app.use('/display', displayData)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})