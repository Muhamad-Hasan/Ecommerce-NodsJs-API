const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Filters = require('../models/Filters');
const router = express.Router();

router.route('/')
.get((req,res,next) => {

    Filters.find({})
    .sort({'sortOrder':1})
    .then((resp) => {
        debugger
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);

    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    console.log('first',req.body.filterName);
    
    req.body.filterName=req.body.filterName.sort(function(a , b){return a.sortOrder - b.sortOrder})
    console.log(req.body.filterName);
    Filters.create(req.body)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
        }, (err) => next(err))
       .catch((err) => next(err));
})

router.delete('/', (req, res, next) => {
    var deleteItems =[]
    
    Filters.deleteMany({ _id: { $in: (deleteItems) } })
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});


router.get("/:Id",(req ,res,next)=>{
    Filters.findById(req.params.Id)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.put("/:Id",(req ,res)=>{
    Filters.findByIdAndUpdate(req.params.Id, {
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
