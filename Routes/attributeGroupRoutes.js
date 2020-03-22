const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const AttributeGroup = require('../models/AttributeGroup');
const Filters = require('../models/Filters');

const router = express.Router();

router.route('/')
.get((req,res,next) => {

    AttributeGroup.find({})
    .sort({'sortOrder':1})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    
    AttributeGroup.create(req.body)
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


    


router.delete('/',(req, res, next) => {

    console.log('now',req.body)
    Category.deleteMany({ _id: { $in: ['5da84fd974962916a048279f' ,'5da85aedbb47092bc09aff15'  ] } })
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


router.get("/filters",(req , res)=>{
    Filters.find()
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
     

    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = router
