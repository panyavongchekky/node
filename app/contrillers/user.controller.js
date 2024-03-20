//const { error } = require('console');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
//const { useId } = require('react');
require('dotenv').config()  //this line optional if you use lower version of node.js
 
exports.create = (req , res) =>{
  if ( !req.body.email || !req.body.password) {
              res.status(400).send({ message: "email and password cannot be empty"});
                    return;                 
            }
            const newUser = new User({
                    email: req.body.email,
                    password: req.body.password
            });

            User.create(newUser,(error, data) =>{
            if (error) {
               res.status(500).send({message:error || "some error"});

          }else {
                 res.status(201).send(data);
                    }
            });
};

exports.login = (req , res) =>{
        if (!req.body.email || !req.body.password) {
         res.status(400).send({ message: "email and password cannot be empty"});
        return;                 
         }
        User.loginByEmailAndPassword(req.body.email, req.body.password,(error, user) =>{

                if(hasError(res, error))
                return;

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(accessToken, user.id);
        res.json({accessToken, refreshToken});
        });
}
 
//jwt ສ້າງຂໍ້ມຸນເກັບໃນຮຸບແບບ ່json
generateAccessToken = (userId) =>{
        return jwt.sign( {userId:userId}, process.env.SECRET_KEY, {expiresIn: '1h'} );
}

generateRefreshToken = (accessToken, userId) =>{
        return jwt.sign({userId:userId,accessToken:accessToken}, process.env.REERESH_KEY,{expiresIn: '7d'});
}
        hasError = (res, error) =>{
                if(error){
                    if(error.kind === 'not_found'){
                         res.status(401).send( {message: "invalid email or password"} );
                    }else{
                        res.status(500).send ( {message: "some error"} )
                        }
                        return true;
                }
}