var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var categoriesSchema = new Schema({
    categoryName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    metaTagTitle:{
        type:String,
        required:true
    },
    metaTagDescrition:{
        type:String,
        
    },
    metaTagKeywords:{
        type:String,
        
    },
    parent:{
        type:String,
        
    },
    filters:{
        type:Array,
        
    },
    image:{
        type:String,
        
    },
    sortOrder:{
        type:Number,
        
    },
    Colmuns:{
        type:Number,
        
    },
    status:{
        type:Boolean,
        default:true
    },
    childrens:{
        type:Array
    }
    

},
{
    timestamps:true
});

module.exports = mongoose.model('Category', categoriesSchema);