const db = require("../models");
const jwt = require('jsonwebtoken');

const Authentication = async (req, res, next) => {

    const token = req.headers['token'];

    if (token == null) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    jwt.verify(token, process.env.KEY_SECRET, (err, decoded) =>{
        if (err) {
            return res.status(403).json({
                message: "token invalid!",
            });
        };
        req.email_user = decoded.email_user;
        next();
    })

}


module.exports = {
    Authentication
};