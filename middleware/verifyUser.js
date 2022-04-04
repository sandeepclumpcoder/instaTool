const jwt = require("jsonwebtoken");
const JWT_SECRET = "clumpCoder"

const fetchUser = async (req, res, next) => {
    try {
        let token = req.header("authorization");
        let tokenArray = token.split(" ");
        const finalToken = tokenArray[1];
        const data = jwt.verify(finalToken, JWT_SECRET);
        req.user = data.user;
        console.log("data",data);
        req.token = finalToken;
        next();
    } catch (error) {
        console.log("error", error);
        res.status(401).send({ error: "invaild token" })
    }
}

module.exports = fetchUser