var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var informationSchema = new Schema({
    informationTitle:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    metaTagTitle:{
        type:String,
        required:true
    },
    metaTagDescription:{
        type:String,
        required:true
    },
    metaTagKeywords:{
        type:String,
        required:true
    },
    sortOrder:{
        type:Number,
    },
    status:{
        type:Boolean,
        default:true
    },
},
{
    timestamps:true
});

module.exports = mongoose.model('Information',  informationSchema);