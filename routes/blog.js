const express = require("express");
const BlogModel = require("../models/blog");
const blogRoute = express.Router();



blogRoute.get("/", async (req, res) => {
    let { order, category, title } = req.query
    let data = []
    try {
        if (order && category && title) {
            data = await BlogModel.find({ title: { $regex: title }, category: category }).sort({ date: order })
        } else if (order && category) {
            data = await BlogModel.find({ category: category }).sort({ date: order })
        } else if (category && title) {
            data = await BlogModel.find({ title: { $regex: title }, category: category })
        } else if (order && title) {
            data = await BlogModel.find({ title: { $regex: title } }).sort({ date: order })
        } else if (order) {
            data = await BlogModel.find().sort({ date: order })
        } else if (title) {
            data = await BlogModel.find({ title: { $regex: title } })
        } else if (category) {
            data = await BlogModel.find({ category: category })
        } else {
            data = await BlogModel.find()
        }
        res.status(200).send({ data: data })

    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

blogRoute.post("/", async (req, res) => {
    let data = req.body;
    try {
        await BlogModel.insertMany([data])
        res.status(201).send({ msg: "blog saved" })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})
blogRoute.patch("/:id/like", async (req, res) => {
    let id = req.params.id;
    try {
        let val = await BlogModel.findOne({ _id: id });
        val.likes++
        let data = await BlogModel.findByIdAndUpdate(id, val)
        res.status(200).send({ msg: "liked it" })


    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})
blogRoute.patch("/:id/comment", async (req, res) => {
    let id = req.params.id;
    try {
        let val = await BlogModel.findOne({ _id: id });
        let cmt={username:req.body.userName,content:req.body.content}
        val.comments.push(cmt)
        console.log(val)
        let data = await BlogModel.findByIdAndUpdate(id, val)
        res.status(200).send({ msg: "commented it" })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})
blogRoute.patch("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let val = await BlogModel.findOne({ _id: id });
        if (val.userId == req.body.userId) {
            let data = await BlogModel.findByIdAndUpdate(id, req.body)
            res.status(200).send({ msg: "updated" })
        } else {
            res.status(400).send("Your not owner of this blog")
        }

    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

blogRoute.delete("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let val = await BlogModel.findOne({ _id: id });
        if (val.userId == req.body.userId) {
            let data = await BlogModel.findByIdAndDelete(id)
            res.status(200).send({ msg: "deleted" })
        } else {
            res.status(400).send("Your not owner of this blog")
        }
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

module.exports = blogRoute