const jwt = require('jsonwebtoken');
const User = require('../models/User')

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        //console.log("token is:" + req.cookies.token)

        const verify = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: verify._id, "tokens.token": token });

        if (!rootUser) {
            console.log('User not found!')
            throw new Error('User not found!')
        }
        else {
            req.token = token;
            req.rootUser = rootUser;
            req.userID = rootUser._id;
            //console.log("in verify")
            next();
        }
    }
    catch (err) {
        res.status(401).json('Unauthorized:No token provided');
        console.log("error is" + err);
    }
}

//verifyTokenAdmin

const verifyTokenAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        //console.log("token is:" + token)

        const verify = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: verify._id, "tokens.token": token });

        if (!rootUser) {
            console.log('User not found!')
            throw new Error('User not found!')
        }
        else {
            if (rootUser.isAdmin === true) {
                req.token = token;
                req.rootUser = rootUser;
                req.userID = rootUser._id;
                //console.log("in verify admin")
                next();
            } else {
                throw new Error('User not found!')
            }
        }
    }
    catch (err) {
        res.status(401).json('Unauthorized:No token provided');
        console.log("error is" + err);
    }
}

module.exports = { verifyToken, verifyTokenAdmin };