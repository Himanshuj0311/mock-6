const mongoose = require("mongoose");

const BlogShema = mongoose.Schema({
    userId:String,
    title :String,
    content :String,
    userName :String,
    category :String,
    date:{
        type:Date,
        default:Date.now
    },
    likes:{
        type:Number,
        default:0
    },
    comments:[]
})

const BlogModel = mongoose.model("Blogs",BlogShema);

module.exports=BlogModel