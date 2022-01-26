const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const userRoute = require('./routes/User')
const userAuth = require('./routes/Auth')
const userProduct = require('./routes/Product')
const userCart = require('./routes/Cart')
const userOrder = require('./routes/Order')
const userStripe = require('./routes/Stripe')
const cors =  require('cors') 


mongoose.connect(
  process.env.MONGO_URL)
.then(()=> console.log("db is connected successfully"))
.catch(err => console.log(err))

app.use(cors())
app.use(express.json())
app.use('/api/auth',userAuth)
app.use('/api/users',userRoute)
app.use('/api/products',userProduct)
app.use('/api/Carts',userCart)
app.use('/api/Orders',userOrder)
app.use('/api/checkout',userStripe)



app.listen(process.env.PORT || 5000 ,()=>{
    console.log("server is running ",process.env.PORT )
})
