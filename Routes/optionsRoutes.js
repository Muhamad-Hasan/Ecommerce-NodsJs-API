const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const Options = require('../models/Options');
const Filters = require('../models/Filters');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
  
      cb(null, 'public/Options');
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
  

router.route('/')
.get((req,res,next) => {

    Options.find({})
    .sort({'sortOrder':1})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(upload.array('images',10),(req, res, next) => {
    console.log(req.body.optionValue[0])

    for(var i= 0; i<req.body.optionValue.length;i++){

        req.body.optionValue[i].image = req.files[i].filename;

    }
    // let arr = [];
    // for(var i= 0; i<req.files.length;i++){
    //     arr.push({optionValueName:req.body.optionValueName ,optionValueImage:"new", sortOrder:req.body.SortOrder})
    
    // }
    // req.body.optionValue = arr;
    // console.log('new',req.body.optionValue)
    // console.log(req.body.optionValueName)
    // //req.optionValue[0].image = req.file.originalname;
    Options.create(req.body)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
            
        }, (err) => next(err))
        .catch((err) => next(err));
    })

// router.route('/group')
// .get((req,res,next) => {

//     Category.find({})
//     .sort({'sortOrder':1})
//     .then((resp) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })
// .post((req, res, next) => {
    
//     AttributeGroup.create(req.body)
//     .then((resp)=>{
//         res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(resp);
            

//         }, (err) => next(err))
//         .catch((err) => next(err));
//     })

router.delete('/', (req, res, next) => {
    var deleteItems =req.body.deleteItems;
    
    Options.deleteMany({ _id: { $in: (deleteItems) } })
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});

// router.get("/:Id",(req ,res)=>{
//     Category.findById(req.params.Id)
//     .then((resp)=>{
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// });

router.put("/:Id",(req ,res)=>{
    Options.findByIdAndUpdate(req.params.Id, {
        $set: req.body
    }, { new: true })
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
     }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = router
