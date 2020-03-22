var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    admin:{
        type: Boolean,
        default: false
    },
    firstName:{
        type:String,
        required:true  
    },
    lastName:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
},
{
    timestamps : true
}

);
var options={
    usernameField : 'email',
                      
}
User.plugin(passportLocalMongoose, options);
module.exports = mongoose.model('User', User);