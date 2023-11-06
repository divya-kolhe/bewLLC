const Joi = require('joi');

const createAccountSchema = (req,res,next)=>{
    const schema = Joi.object({
        name : Joi.string().required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(6).required()
    });
    validateRequest(req,res,next,schema, req.body);
}

const loginSchema = (req,res,next) =>{
    const schema = Joi.object({
        email: Joi.string().required(),
        password : Joi.string().required()
    });
    validateRequest(req,res,next, schema, req.body);
}

const validateUserId = (req,res,next) =>{
    const schema = Joi.object({
        userId : Joi.string().trim().regex(/^[a-f\d]{24}$/i).required().description("User Id").label("User Id")
    });
    validateRequest(req,res,next,schema, req.params);
}

function validateRequest(req,res,next,schema,type){
    const options = {
        abortEarly : false, // include all errors
        allowUnknown : true, // ignore unknow props
        signUpknown : true, // remove unkonwn props
    };
    const {error, value} = schema.validate(type,options);
    if(error){
        const {details} = error;
        const message = details.map(i=> i.message);

        console.log("error",message);
        res.status(400).json({statusCode:400, message:message[0]});

    }else{
        req.body = value;
        next();
    }
}

module.exports = {
    createAccountSchema,
    loginSchema,
    validateUserId
}