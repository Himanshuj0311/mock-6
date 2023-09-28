const express=require("express");
const connetToDb=require("./config/db");
const userRoute = require("./routes/user")
const auth = require ("./middleware/auth")
const blogRoute = require("./routes/blog")
const cors=require("cors");
const app = express();
app.use(cors());
require("dotenv").config();
app.use(express.json());
const port = +process.env.PORT || 8080
app.use("/",userRoute);
app.use(auth)
app.use("/blogs",blogRoute)



app.listen(port,async()=>{
    try {
        await connetToDb
        console.log("Server runing at port",port)
    } catch (error) {
        console.log(error.message)
    }
})