const mongoose=require("mongoose");

require("dotenv").config();

const connetToDb=mongoose.connect(process.env.mongoURL);

module.exports = connetToDb