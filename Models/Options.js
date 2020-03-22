var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var optionsSchema = new Schema({
    optionName:{
        type:String,
        required:true
    },
    sortOrder:{
        type:Number,
    },
    optionType:{
        type:String
    },
    optionValue:{
        type:Array
    }
    
    
}
,{
    timestamps:true
});

module.exports = mongoose.model('Option', optionsSchema);