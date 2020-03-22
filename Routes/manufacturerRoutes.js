const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const Manufacturer = require('../models/Manufacturer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
  
      cb(null, 'public/Manufacturer');
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

    Manufacturer.find({})
    .sort({'sortOrder':1})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);

    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(upload.single('image'),(req, res, next) => {
    req.body.img = req.file.originalname;
    Manufacturer.create(req.body)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
        }, (err) => next(err))
       .catch((err) => next(err));
})

router.delete('/', (req, res, next) => {
    var deleteItems =[]
    
    Manufacturer.deleteMany({ _id: { $in: (deleteItems) } })
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});

router.get("/:Id",(req ,res)=>{
    Manufacturer.findById(req.params.Id)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.put("/:Id",(req ,res)=>{
    Manufacturer.findByIdAndUpdate(req.params.Id, {
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
