const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Information = require('../models/information');

const router = express.Router();

router.route('/')
.get((req,res,next) => {

    Information.find({})
    .sort({'sortOrder':1})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Information.create(req.body)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
        }
        , (err) => next(err))
        .catch((err) => next(err));
    })

router.delete('/', (req, res, next) => {
    var deleteItems =[]
    
    Information.deleteMany({ _id: { $in: (deleteItems) } })
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});
    
router.put("/:Id",(req ,res)=>{
    Information.findByIdAndUpdate(req.params.Id, {
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
