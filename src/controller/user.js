const User = require("../models/user");

exports.postSignUp = (req,res,next)=>{
    User.findOne({email: req.body.email})
    .exec((error,user)=>{
        if(user){
            return res.status(404).json({
                message: "User already registered"
            });
        }
        if(error) {
            return res.status(400).json({
                message: "Error occured!"
            })
        }
        const {firstName,lastName,email,password} = req.body;
        
        const _user = new User({firstName,lastName,email,password,userName:Math.random().toString()})
        _user.save((err,data)=>{
            if(err){
                console.log(err);
                return res.status(400).json({
                    message: 'something went wrong'
                })
            }
            if(data){
                console.log("created user-->",data);
                return res.status(201).json({
                    
                   message: "user created Successfuly"
                });
            }
        })
    })
}