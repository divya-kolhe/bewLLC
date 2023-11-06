const jwt = require('jsonwebtoken');

exports.auth = async (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decode = await jwt.verify(token, process.env.JWT_KEY,{algorithms:process.env.JWT_ALGO});
        req.userData = decode;
        next();
    }
    catch(e){
        return res.status(400).send({
            statusCode : 401,
            message : 'Unauthorized Request'
        })
    }
}