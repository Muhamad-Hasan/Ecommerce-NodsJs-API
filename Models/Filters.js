var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var filtersSchema = new Schema({
    filterGroupName:{
        type:String,
        required:true
    },
    sortOrder:{
        type:Number,
        
    },
    filterName:[
        {name:String,
        sortOrder:Number}
    ]
        
        
    
}
,{
    timestamps:true
});

module.exports = mongoose.model('Filters', filtersSchema);