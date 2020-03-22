var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var optionSchema = mongoose.Schema({
    name:String,
    optionValue:String,
    quantity:Number,
    type:String
})


var productSchema = new Schema({
    productName:{
        type:String,
        
    },
    description:{
        type:String,
        
    },
    metaTagTitle:{
        type:String,
        
    },
    metaTagDescription:{
        type:String,
        
    },
    metaTagKeywords:{
        type:String,
        
    },
    productTags:{
        type:String,
        
    },
    model:{
        type:String
    },
    location:{
        type:String
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    minimumQuantity:{
        type:Number
    },
    subtractStock:{
        type:String,
        enum:["yes" ,"no"],
        default:"yes"
        
    },
    outOfStockStatus:{
        type:String,
        enum:['2-3 Days','In Stock','Out of Stock' ,'pre-Order'],
        default:'In Stock'
    },
    sortOrder:{
        type:Number
    },
    status:{
        type:Boolean,
        enum:[true,false],
        default:true
    },
    Manufacturer:{
        type:String,
        
    },
    Categories:{
        type:String
    },
    Filters:{
        type:Array
    },
    relatedProducts:{
        type:Array
    },
    attribute:{
        type:Array

    },

    
    discount:[
        {
            customerGroup:String,
            quantity:Number,
            priority:Number,
            price:Number,
            startDate:Date,
            endDate:Date
            
        }
    ],
    special:[
        {
            customerGroup:String,
            priority:Number,
            price:Number,
            startDate:Date,
            endDate:Date
            
        }
    ],
    image:{
        type:String
    },
    additionalImage:{
        type:Array
    },
    option:[optionSchema],
   
}
,{
    timestamps:true
});


module.exports = mongoose.model('Product', productSchema);