const router = require('express').Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken')
 

//REGISTRATION
router.post('/register',(req,res)=>{
    const {username, email ,password} = req.body 
   
    if(!username || !email || !password){
          res.status(400).json({message:"blank field not allowed"})
      }

    else{

  const newUser =new User({
        username:username,
        email:email,
        password:CryptoJS.AES.encrypt(password, process.env.SECRET_KEY_PSS).toString(),
    })
    newUser.save()
    .then((data)=>res.status(201).json(data))
    .catch((err)=>res.status(500).json(err))
}

})

//LOGIN 
router.post('/login',async(req,res)=>{
    const {username ,password} = req.body 
   
    if(!username  || !password){
          res.status(400).json({message:"blank field not allowed"})
      }

    else{

        try{
            const user = await User.findOne({username})
            !user && res.status(400).json({message:"wrong credential"})
          
            const hashedPAssword =   CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY_PSS).toString(CryptoJS.enc.Utf8)
        
            const accessToken = jwt.sign(
                {
                id:user.id,
                isAdmin:user.isAdmin,
                },
               
                process.env.SECRET_KEY_JWT,
                {expiresIn:"3d"});

            const {password , ...others} = user._doc

            hashedPAssword == req.body.password ? 
            res.status(200).json({...others,accessToken})
            :
            res.status(400).json({message:"wrong password"})      
        }
        catch(err){}
    }
})

module.exports = router