var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var manufacturerSchema = new Schema({
    manufacturerName:{
        type:String,
        required:true
    },
    sortOrder:{
        type:Number,
        
    },
    img:{
        type:String,
        
    }
}
,{
    timestamps:true
});

module.exports = mongoose.model('Manufacturer', manufacturerSchema);