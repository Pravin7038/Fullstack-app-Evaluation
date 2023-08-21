const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const blacklist = require("../models/blacklistModel")
const route = express.Router();
require("dotenv").config()

// {
//     "name":"SAdsc",
//     "email":"SAdsc",
//     "gender":"SAdsc",
//     "password":"SAdsc",
//     "age":24,
//     "city":"SAdsc",
//     "is_married":"SAdsc"
//   }

route.post("/register", async (req, res) => {

    try {

        const { name, email, gender, password, age, city, is_married } = req.body;

        const newPass = await bcrypt.hash(password, 10);

        await User.create({ ...req.body, password: newPass })

        res.send({ msg: "New user is created" })


    } catch (error) {

        res.send(error)
    }
})

route.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {

            const verify = await bcrypt.compare(password, user.password);

            if (verify) {

                const token = await jwt.sign({ userid: user.id, username: user.name }, process.env.KEY,{expiresIn:"7d"});

                res.send({ token })
            }
            else {

                res.send({ "error": "error" })
            }


        }

    } catch (error) {

        res.send({ 'mesg': "error" })
    }
})

route.post("/logout", async(req, res) => {

    try {
        const { authorization } = req.headers;

        const token = authorization.split(" ")[1];

       const user =  await blacklist.insertOne(token)

        res.send("ok")

    } catch (error) {

        res.send({ 'mesg': error })
    }
})

module.exports = route;