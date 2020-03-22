var express = require('express');
const bodyParser = require('body-parser');
var User = require('../Models/user');
const mongoose = require('mongoose');
var passport = require('passport');
var nodemailer = require('nodemailer');
var router = express.Router();
router.use(bodyParser.json());
  
router.post('/signup', (req, res, next) => {
  if(req.body.password.length < 8){
    console.log(req.body.password.length);
    res.statusCode = 500;
    res.json({err: "password must have atleast 8 chracters"});
    console.log("password must have atleast 8 chracters");
  }
  if(req.body.password != req.body.conformPassword){
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    res.json({err: "password does not matched"});
    console.log("password does not matched");
  }
  
  else{
    
    if(!req.body.admin){
      req.body.admin=false;
    }
    User.register(
      new User({email: req.body.email,  firstName: req.body.firstName, lastName: req.body.lastName,phone: req.body.phone,  admin:req.body.admin ,address:req.body.address , city:req.body.city , country:req.body.country}), 
      req.body.password,
      (err, user) => {
        console.log('Data', user)
        console.log('err', err)
        
      if(err) {
  
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      }
      
      else {
          passport.authenticate('local');
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!', data:user});
        }
    });
  }
  });
  router.post('/login', function(req, res, next) {
      User.findOne({'email':req.body.email})
      .then((check)=>{
          if(check){
                passport.authenticate('local', function(err, user, info) {
                    if (err) { res.json("err") }
                    console.log('info',info)
                    console.log('user',user)
                    
                    if (!user) { return res.json('wrong password'); }
                    req.logIn(user, function(err) {
                      if (err) { return res.json("wrong"); }
                      return res.json({'success':true, data:req.user});
                    });
                  })(req, res, next);
              }
              else{
                res.json(req.user.email+' does not exsits');
          }
          
          })
          
          
    
  });




//   router.post('/login', passport.authenticate('local',{failureRedirect:'/users/wrong'}), (req, res,err) => {
//     console.log('err',err)
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     if(req.user){
//       res.json({success: true, status: 'You are successfully logged in!',code :res.statusCode,data:req.user});
      
//     }
//     else{
//       res.json({success:false, status: 'Invalid username or password.'});
      
//     }
    
    
//   });
router.get('/wrong',(req,res)=>{
    res.json('wrong')
})

router.get('/logout', (req, res, next) => {
  console.log('logout')
    if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.json("Loged out");
    
    
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});



router.post('/forgot',(req,res)=>{
  function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
  }
  var code = randomInt(1000, 9999);
  console.log(code);
  
  User.findOne({email:req.body.email})
  .then((u)=>{
    let id=u._id;
    console.log(id)
    User.findById(id, function (err, doc) {
      if (err) console.log(err);
      doc.code = code;
      doc.save((code,err)=>{
        if (err) console.log(err);
        console.log(code);
      });
    });
  });
  var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'muhamadhasan043@gmail.com',
    pass: 'artificial.intelligence'
  }
});

var mailOptions = {
  from: 'muhamadhasan043@gmail.com',
  to: req.body.email,
  subject: 'password Reset of Rapid Remmit',
  text: "your verification code is "+code+" .\nGo and paste in your app.\nThanks"
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);

    res.json({"status":"Email has successfully sended"});
  }
});



});

router.post('/changepassword', function(req, res) {
  User.findOne({"email":req.body.email})
  .then((data)=>{
      if(data.code == req.body.code)
      {
        console.log("right");
        var newpassword = req.body.newpassword;
          if(newpassword.length < 8){
            console.log(newpassword.length);
            res.json({err: "password must have atleast 8 chracters"});
            console.log("password must have atleast 8 chracters");
          }
          else{
            User.findOne({email:req.body.email}).then(function(sanitizedUser){
              if (sanitizedUser){
                  console.log(sanitizedUser);
                  sanitizedUser.setPassword(req.body.newpassword, function(){
                      sanitizedUser.save();
                      res.status(200);
                      res.json({message: 'password reset successful'});
                   });
              }
            });
          }
      }
      else{
        res.json({err:"please enter a correct code"});
       }
})
});
module.exports = router;