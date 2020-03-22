const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/'+req.user.email);
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(JPG|jpeg|png|gif|jpg)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFileFilter});
const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get((req, res, next) => {
    Profile.findOne({'author':req.user._id})
    .then((i)=>{
        console.log(i.img);
        res.setHeader('Content-Type', 'application/json');
        res.json({image: "http://mighty-thicket-50157.herokuapp.com/"+req.user.email+"/"+i.img}); 
      })
})

.post(upload.single('imageFile'),(req, res ,next) => {
    console.log("data",req.body);
    // Profile.findOne({"author":req.user._id})
    // .then((pic)=>{
    //      if(pic){
    //          console.log("exsits");
    //              pic.img=req.file.filename;
    //              pic.save(function(err , i){
    //                 if (err) console.log(err);
    //                 res.setHeader('Content-Type', 'application/json');
    
    //                 console.log("file path save to  mongodb");
    //                 console.log('successfully deleted old image');
    //                  res.json("successfully path changes in db");

    //              })
    //      }
    //      else{
    // var i = new Profile;
    // console.log(req.user);
    // i.author = req.user._id;
    // i.img = req.file.filename;
    // i.save(function(err , i){
    //     if (err) console.log(err);
    //     res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    
    //     res.json({message:"File path successfully stores in DB", data:req.file})
    //     console.log("file path save to  mongodb");
    // })
         //}      
//});
    });    

uploadRouter.delete('/', (req ,res)=>{
    Profile.findOne({"author":req.user._id})
    .then((pic)=>{
         if(pic){
             console.log("exsits");
             fs.unlink('./public/'+req.user.email+'/'+pic.img, (err) => {
                 if (err) console.log(err);
                 console.log('successfully deleted old image');
                 res.json("successfully deleted old image");
               });
         }      
});
});
module.exports = uploadRouter;