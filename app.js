var express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var category = require('./Routes/categoryRoutes');
var Filters = require('./Routes/filterRoutes');
var AttributeGroup = require('./Routes/attributeGroupRoutes');
var Attributes = require('./Routes/AttributesRoutes');
var Options = require('./Routes/optionsRoutes');
var manufacturer = require('./Routes/manufacturerRoutes');
var Product = require('./Routes/productRoutes');
var Users = require('./Routes/usersRoutes');
const mongoose = require('mongoose');
const uri = "mongodb+srv://Mhassan:artificial.intelligence@cluster0-2bd7c.mongodb.net/OpenCart?retryWrites=true&w=majority";
const connect = mongoose.connect(uri ,{ useNewUrlParser: true });
var authenticate = require('./authenticate');
var addToCart = require("./Routes/addToCartRoutes");
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });
var app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended :false}))




app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
  }));

app.use(passport.initialize());
app.use(passport.session());
app.use('/users',Users)
app.use('/categories',category)
app.use('/filters',Filters)
app.use('/attributes',Attributes)
app.use('/groups',AttributeGroup)
app.use('/options',Options)
app.use('/manufacturers',manufacturer)
app.use('/products',Product)
app.use('/add',addToCart)
 
function auth (req, res, next) {
  
    if (!req.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      next(err);
    }
    else {
      next();
    }
}
//app.use(auth);

function verifyAdmin(req ,res ,next){
  if(req.user && !req.user.admin){
    console.log(req.user)
    var err = new Error('You are not admin!');
      err.status = 403;
      next(err);
  }
  else{
   next(); 
  }
}
//app.use(verifyAdmin);
module.exports=app
