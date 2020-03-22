var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shoppingSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
    model:{
        type:String,
    },
    quantity:{
        type:Number
    },
    image:{
        type:String
    },
    unitPrice:{
        type:Number
    },
    total:{
        type:Number,
    }
    
    
}
,{
    timestamps:true
});

module.exports = mongoose.model('shoppingCart',shoppingSchema);