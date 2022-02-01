const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {type: String , required: true, },
    desc:{type: String , required: true, },
    img:{type: String , required: true, },
    category:{ type: Array},
    size:{ type: Array},
    color:{ type: Array},
    price:{ type: Number,required: true},
    inStock:{type: Boolean,default: true}
   

}, {timestamp:true})

module.exports =mongoose.model('Product', productSchema)