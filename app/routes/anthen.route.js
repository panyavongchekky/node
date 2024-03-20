const jwt = require('jsonwebtoken');
require('dotenv').config()

//该文件将用于验证标头中的令牌(token header)
module.exports = (req, res, next) =>{
        const  token = req.header('Authorization');

        if(!token){
             return res.status(401).json({ message: 'Access denied. no token provided'});
        }
        try{
           const decoded = jwt.verify(token, process.env.SECRET_KEY);
           req.userId = decoded.userId;
           next();
        } catch(error){
          res.status(400).json({ message: 'invalid token'});
        }
};