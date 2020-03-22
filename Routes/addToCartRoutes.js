const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Products = require('../models/Products');
const Add = require('../models/shoppingCart');
const router = express.Router();

router.post('/:Id',async(req, res)=>{
    Products.findOne({'_id':req.params.Id})
    .then((resp)=>{
                req.body.productName = resp.productName;
                req.body.model = resp.model;
                req.body.image = resp.img;
                req.body.quantity = req.body.quantity;
                req.body.unitPrice = resp.price;
                req.body.total = req.body.quantity * resp.price;
                
        if(resp.outOfStockStatus == 'In Stock'){
            //res.json(resp.option)
           Products.find({'option.type':'Radio'})
            .then((s)=>{
                console.log("sow",s);
            })
            
            
            
            if(req.body.option[0].quantity){
                console.log('new',resp.option[0].optionValue)
                for(var i=0; i>resp.option.length; i++){
                    if(resp.option[i].optionValue == req.body.option){
                        if(resp.option[i].quantity >= res.body.quantity){
                            Add.create(req.body)
                            .then((cart)=>{
                            res.setHeader('Content-Type', 'application/json');
                            res.statusCode = 200;
                            res.json(cart)
                            });    

                        }
                        else{
                            //res.json("store have only "+resp.option[i].quantity+" "+resp.option[i].quantity+' '+resp.productName+'s');            
                        } 
                    }
                }
            }
            else{
                if(resp.quantity>=req.body.qunatity){
                    Add.create(req.body)
                        .then((cart)=>{
                        res.setHeader('Content-Type', 'application/json');
                        res.statusCode = 200;
                        res.json(cart)
                        })

                }
                else{
                    res.json("store have only "+resp.qunatity+" "+resp.productName);    
                }
            }
        }
        else{
            res.json(resp.productName+" is not in stock");
         }
 
        //     
        //         req.body.productName = resp.productName;
        //         req.body.model = resp.model;
        //         req.body.image = resp.img;
        //         req.body.quantity = req.body.quantity;
        //         req.body.unitPrice = resp.price;
        //         req.body.total = req.body.quantity * resp.price;
                
        //         Add.create(req.body)
        //         .then((cart)=>{
        //             res.setHeader('Content-Type', 'application/json');
        //             res.statusCode = 200;
        //             res.json(cart)
        //         });
        //     }
        //     else{
        //         res.json("store have only "+resp.qunatity+" "+resp.productName);    
        //     }
        // }
        

        

    })
});

router.get('/',(req,res)=>{
    
    Add.find()
    .then((resp)=>{
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json(resp)
    })
})

module.exports = router;