const express = require('express');
const mongoose = require('mongoose');
const Products = require('../models/Products');
var file = null;
const multer = require('multer');
const Category = require('../models/categories');
const Filters = require('../models/Filters');
var mkdirp = require('mkdirp');
//const multipart = require('multipart');
const bodyParser = require('body-parser');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null, 'public/Products');
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },

});
const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(JPG|jpeg|png|gif|jpg)$/)) {
    return cb(new Error('You can upload only image files!'), false);
  }
  cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFileFilter });
// var uploadImages = upload.array(('image',10),(err,done)=>{
//     console.log("uploaded")
//     if(err){console.log(err);}
//   });  

const router = express.Router();
router.use(bodyParser.json());

// const preuploadMiddleware = (req, res, next) => {
//   req.imagesFolder="folder";
//   next();

// };


router.route('/')
  .get((req, res, next) => {
    var count=Object.keys(req.query).length;
    console.log(req.query)
    if(count>=1){
      let query=req.query
      Products.find(query)
      .sort({ 'sortOrder': 1 })
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
    


    }
    else{
      Products.find({ $and: [{ 'status': true }, { 'parent': null }] })
      .sort({ 'sortOrder': 1 })
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
    }
    
  })


  .post(upload.array('image', 20), async (req, res, next) => {
    var additionalName = [];
    var main;
    req.body.image = 'no'
    
    if(req.files){
      var l = req.files.length;
      main = req.files[(l - (l - 1)) - 1].filename;
      console.log(main)
      for (var i = 1; i < req.files.length; i++) {
        additionalName.push(req.files[i].filename);
    }
    console.log("addd", additionalName);
    console.log(req.files);
    req.body.additionalImage = additionalName;
    req.body.image = main
    
    }
    const productOne = new Products({
      productName:req.body.productName , description:req.body.description ,
      productTags:req.body.productTags , model:req.body.model ,
      price:req.body.price , quantity:req.body.quantity ,
      outOfStockStatus:req.body.outOfStockStatus , manufacturer:req.body.manufacturer,
      image:req.body.image, additionalImage: req.body.additionalImage
        
    })
    if(req.body.option){
    console.log('body',req.body.option.length)
    for (var i=0; i<req.body.option.length;i++ ){
       productOne.option.push(req.body.option[i]);
      console.log("data", req.body.option[i])
    }
    console.log("final", productOne);
    productOne.save((req ,res)=>{
      console.log("n",res)
    
    })
  }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(productOne) ;
  
  })

// if(req.files){
//   var n = req.body.productName;
// let d = './public/folder';
// if (fs.existsSync(d)){
//   console.log("crearted")
//   await fs.rename('./public/folder','./public/'+n, function (err) {
//     if (err) console.log(err);
//   })}}



// router.get("/:Id",(req ,res)=>{
//     Category.findById(req.params.Id)
//     .then((resp)=>{
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// });

router.put("/:Id", (req, res) => {
  Category.findByIdAndUpdate(req.params.Id, {
    $set: req.body
  }, { new: true })
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.get('/:Id',(req, res)=>{
  Products.find({"_id":req.params.Id})
  .then((resp)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp)
  })
})

router.delete('/', (req, res, next) => {
  var deleteItems =req.body.deleteItems
  
  Products.deleteMany({ _id: { $in: (deleteItems) } })
      .then((resp) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
});

module.exports = router
