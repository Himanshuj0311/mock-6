require("dotenv").config()
var jwt = require('jsonwebtoken');
const auth = async (req, res, next) => {
    try {
        let token = req?.headers?.authorization?.split(" ")[1] || null;

        if (token) {
            var decoded = jwt.verify(token, process.env.secrect);
            //console.log(decoded);
            req.body.userId = decoded.id
            req.body.userName = decoded.userName
            req.body.username = decoded.userName
            next()
        } else {
            res.status(400).send({ msg: "Please login first" })
        }


    } catch (error) {
        res.status(400).send({ err: error.message })
    }
}

module.exports = auth