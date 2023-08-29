const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/User')
const contactModel = require('../models/Message')
const { verifyToken, verifyTokenAdmin } = require('../middlewares/verifyToken')

//getAllData
router.get('/getAll', verifyTokenAdmin, async (req, res) => {
    try {
        const data = await userModel.find();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//about
router.get('/about', verifyToken, async (req, res) => {
    res.status(200).json(req.rootUser);
})

//contact
router.post('/contact', verifyToken, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body
        if (!name || !email || !phone || !message) {
            return res.status(500).json('500')
        }

        let eId = await contactModel.findOne({ 'email': req.body.email })
        console.log(eId)
        if (eId === null) {
            try {
                await contactModel.create({
                    email: req.body.email,
                    messages: [{ name, email, phone, message }]
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
                eId.messages.push({ name, email, phone, message });
                await eId.save();
                res.status(200).json({ success: true })
            } catch (error) {
                console.log(error.message)
                res.send("Server Error" + error.message)
            }
        }
    } catch (error) {
        //console.log("Error is ++++ " + error)
        return res.status(500).json('500');
    }
})

//signup
router.post('/signup', async (req, res) => {
    const isAdmin = req.body.isAdmin;
    const name = req.body.name;
    const address = req.body.address;
    const email = req.body.email;
    const contactNo = req.body.contact;
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    try {
        if (!name || !address || !email || !password || !cpassword || !contactNo) {
            throw new Error("Plz fill the data properly!")
        }

        const userExist = await userModel.findOne({ email: email });
        if (userExist) {
            throw new Error('Email already registered!')
        }
        else if (password != cpassword) {
            throw new Error('Password not matching!')
        } else {
            const user = new userModel({
                name, address, email, password, cpassword, contactNo, isAdmin
            });
            await user.save();
            return res.status(201).json({ user })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('500')
    }
})

//signin
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            throw new Error("Plz fill the data properly!");
        }

        const userLogin = await userModel.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (!isMatch) {
                throw new Error("Invalid Credentials!")
            }

            //jwt 
            const token = await userLogin.generateAuthToken();

            //storing jwt token in cookie
            res.cookie("token", token, {
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly: false,
                secure: false
            })
            return res.status(200).json({ userLogin, token })
        } else {
            throw new Error("Invalid Credentials")
        }
    } catch (err) {
        return res.status(500).json('500')
    }
})

//logout
router.get('/logout', async (req, res) => {
    //console.log('Logout page')
    //console.log("root user is" + req.rootUser)
    res.clearCookie('token')
    res.status(200).json(req.rootUser);
})

//Delete by ID Method
router.delete('/delete/:id', verifyTokenAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await userModel.findByIdAndDelete(id)
        res.status(200).json(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router