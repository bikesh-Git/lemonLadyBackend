const jwt = require('jsonwebtoken')
 

const verifyToken = (req,res,next) =>{
  
    const authHeader = req.headers.token
    if(authHeader){
      
        const token = authHeader.split(' ')[1]
      jwt.verify(token,  process.env.SECRET_KEY_JWT,(err,data)=>{
        if(err) {
            res.status(403).json("token is not valid") 
        }
        req.user=data
        next()
      } )

    }
    else{
        res.status(401).json("you are not authenticated")
    }
}

const verifyTokenAndAutharisation =(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            next()
        }
        else{
            res.status(403).json("you are not allowed to do that!!")
        }
    })   
}

const verifyTokenAndAdmin =(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }
        else{
            res.status(403).json("you are not allowed to do that!!")
        }
    })   
}

module.exports = {verifyToken,verifyTokenAndAutharisation ,verifyTokenAndAdmin}