var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var attributeGroupSchema = new Schema({
    attributeGroupName:{
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

module.exports = mongoose.model('AttributeGroup', attributeGroupSchema);