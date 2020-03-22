var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var attributesSchema = new Schema({
    attributeName:{
        type:String,
        required:true
    },
    attributeGroup:{
        type:String,
        required:true
    },
    sortOrder:{
        type:Number,
    },
}
,{
    timestamps:true
});

module.exports = mongoose.model('Attributes', attributesSchema);