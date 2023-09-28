const mongoose = require("mongoose");

const UserShema = mongoose.Schema({
    email:String,
    avatar :String,
    password :String,
    userName :String
    
})

const UserModel = mongoose.model("User",UserShema);

module.exports=UserModel