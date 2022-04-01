const jwt = require("jsonwebtoken");
const JWT_SECRET = "clumpCoder"

const fatchUser = async(req,res,next)=>{
    const token = req.header("auth-token");
    if(!token){
        res.stausCode = 400;
        res.json({error: "invaild token"});
    }
    try {
        const data = jwt.verify(token , JWT_SECRET);
        req.user = data.user;
        console.log(req.user);
        next();
    } catch (error) {
        console.log("error",error);
        res.status(401).send({ error: "invaild token" })
    }
}
