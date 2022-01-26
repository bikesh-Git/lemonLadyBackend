
const router = require('express').Router();
const stripe = require('stripe')("sk_test_51KFDoSSBvYCKRRzOxWTDFamm9mbOG05dLP5Nr2fmfZ4XQhyHbLwT5H6cLWU2qYTtIIuHXFt3sNOnGP7d599Oh7Rw004no6KOn1");


router.post('/payment',async(req,res)=>{
  console.log("sasa",req.body.tokenId)
   try{ 
       const charge = await  stripe.charges.create({
        source: req.body.tokenId,
        amount:req.body.amount,
        currency:"usd",
    })

    res.status(200).json(charge)
    }
    catch(err){ console.log(err)}
})


module.exports = router