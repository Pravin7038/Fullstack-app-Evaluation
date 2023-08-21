const jwt = require("jsonwebtoken")
require("dotenv").config()
const auth = (req, res, next) => {

    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.KEY, (err, decoded) => {

        console.log(decoded)
        if (decoded) {
            req.userid = decoded.userid;
            req.username = decoded.username;
            next();
        }
        else {

            res.send({ "error": "something went wrong" })
        }
    })

}

module.exports = auth;