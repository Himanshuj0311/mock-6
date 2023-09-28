const express = require("express");
const userRoute = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const UserModel = require("../models/user");
require("dotenv").config()
const saltRounds = +process.env.salt;

userRoute.post("/register", async (req, res) => {
    try {
        const { email, userName, password, image } = req.body
        const hash = await bcrypt.hash(password, saltRounds);
        const data = await UserModel.insertMany([{ email, userName, password: hash, image }])
        res.status(201).send({ msg: "User Registered Successful" ,data})

    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})
userRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await UserModel.findOne({ email: email })
        if (data) {
            const result = await bcrypt.compare(password, data.password);
            if (result) {
                const token = jwt.sign({ id: data._id, userName: data.userName }, process.env.secrect);
                res.status(201).send({ token, msg: "login successful", userId: data._id })
            } else {
                res.status(200).send({ msg: "login failed" })
            }
        } else {
            res.status(200).send({ msg: "login failed" })
        }

    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

module.exports = userRoute