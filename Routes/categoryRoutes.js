const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const Category = require('../models/categories');
const Products = require('../models/Products');

const router = express.Router();
router.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
  
      cb(null, 'public/Categories');
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
    .get((req, res, next) => {

        Category.find({ $and: [{ 'status': true }, { 'parent': null }] })
            .sort({ 'sortOrder': 1 })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(upload.single('image'),(req, res, next) => {
        if(req.file){
            req.body.image = req.file.filename;
        
        }
        Category.create(req.body)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
                if (resp.status) {
                    if (resp.parent) {
                        Category.findOne({ 'categoryName': resp.parent })
                            .then((subCategory) => {
                                subCategory.childrens.push({Id:resp._id, name:resp.categoryName})
                                subCategory.save();
                                console.log(subCategory);
                            })
                    }
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })

router.delete('/:name', (req, res, next) => {
    let name = req.params.name;
    var deleteItems =   req.body.deleteItems
    
    console.log('name',Object.keys(req.body).length)
    Category.find({categoryName:name})
    .select('childrens').countDocuments()
    .then((resp)=>{
        
        if(resp == 0){
            Products.find({categoryName:name}).countDocuments()
            .then((pro)=>{
                if(pro == 0){
                    Category.deleteMany({ _id: { $in: (deleteItems) } })
                        .then((resp) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(resp);
                    }, (err) => next(err))
                        .catch((err) => next(err));                
                    }  
                })
        }
        
    });
    
    
    
});


router.get("/:Id",(req ,res)=>{
    Category.findById(req.params.Id)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.put("/:Id",(req, res) => {
    console.log(req.params.Id)
    console.log("new",req.body)
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

module.exports = router
