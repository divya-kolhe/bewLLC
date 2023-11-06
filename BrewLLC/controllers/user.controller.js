const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = (req,res, next)=>{
    User.find({email : req.body.email})
    .exec()
    .then(users =>{
        if(users.length >= 1){
            return res.status(409).json({
                statusCode : 400,
                message : 'Mail Exists'
            })
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.json({
                        error : err
                    })
                }else{
                    const user = new User({
                        name : req.body.name,
                        email : req.body.email,
                        password : hash
                    });
                    user.save()
                    .then(result =>{
                        console.log(result);
                        const token = jwt.sign({
                            email : result.email,
                            userId : result._id
                        },
                            process.env.JWT_KEY, {
                                expiresIn : '1h',
                                algorithm : process.env.JWT_ALGO
                            }
                        );
                        res.status(201).json({
                            status : 201,
                            message : "User Created",
                            token : token
                        })
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            status : 500,
                            message : err
                        })
                    })
                }
            })
        }
    })
}

exports.login = (req,res)=> {
    User.find({email : req.body.email})
    .exec()
    .then(user =>{
        if(user.length < 1){
            res.status(401).json({
            statusCode : 401,
            message : "Invalid Credentials"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result) =>{
            if(err){
                res.status(401).json({
                    statusCode : 401,
                    message : "Invalid Credentials"
                })
            }
            if(result){
                const token = jwt.sign({
                    email : user.email,
                    userId : user._id
                },
                    process.env.JWT_KEY, {
                    expiresIn : '1h',
                    algorithm : process.env.JWT_ALGO
                    }
                );
                res.status(201).json({
                    status : 201,
                    message : "Login Successfull",
                    token : token
                })
            }
            else{
                res.status(401).json({
                    statusCode : 401,
                    message : "Invalid Credential"
                })
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
        status : 500,
        message : err
    })
})
}

exports.getProfile = (req,res)=>{
    User.findById({_id : req.params.userId})
    .then((data)=>{

        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(404).send(err);
    })
}