const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const secret = process.env.SECRET_KEY;

const authToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).send({ message: "Not authenticated, please log in" });    }
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        console.error({ error: "Token is invalid or expired" });
        return res.status(401).send({ message: "Token is invalid or expired" });
    }
}

module.exports = authToken;