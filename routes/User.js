const router = require('express').Router();
const CryptoJS = require('crypto-js');
const User = require('../models/User')
const { verifyTokenAndAutharisation ,verifyTokenAndAdmin} = require('./VerifyToken')


//UPDATE
router.put('/:id', verifyTokenAndAutharisation, async (req, res) => {

    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY_PSS).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

             res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//DELETE
router.delete('/:id', verifyTokenAndAutharisation, async (req, res) => {
    try {
       await User.findByIdAndDelete(req.params.id)

             res.status(200).json("user has been deleted")
    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET USER
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    
    try {
       const user = await User.findById(req.params.id)
           const {password, ...other} = user._doc

             res.status(200).json(other)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET ALL USER
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
           const user = query ? await User.find(req.params.id).sort({id:-1}).limit(5) : await User.find(req.params.id)
        
            res.status(200).json(user)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//STATS
router.get('/stats' ,verifyTokenAndAdmin, async(req,res)=>{
    const d =new Date();
    const lastYear=new Date(d.setFullYear(d.getFullYear() -1));
    console.log(lastYear);

    try{
        const data =await User.aggregate([
            {$match: {  createdAt: {$gte : lastYear}}},

            {
                $project :{
                month: { $month:"$createdAt" },
            },
            },

            {
                $group:{
                    _id:"$month",
                    total:{$sum: 1},
                },
            } 
        ])
        
    res.status(200).json(data)
    }

    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router