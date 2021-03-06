var express = require('express');
var router = express.Router();
var Product=require('../models/product');
router.get('/order/:orderId',function(req,res,next){

    Product.getProductByOrderId(req.params.orderId,function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });

});
router.get('/supplier/:id',function(req,res,next){
     console.log("what");
    Product.getProductBySupplierId(req.params.id,function(err,rows){
     
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });

});
router.get('/:id?',function(req,res,next){

if(req.params.id){

    Product.getProductById(req.params.id,function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
}
else{

 Product.getAllProducts(function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
 
    });
}
});
router.post('/',function(req,res,next){

        Product.addProduct(req.body,function(err,count){
                        console.log(count);
            console.log(err);
        Product.updateOrderPrice(req.body.orderID,function(err,count){
            Product.updateFinance(function(err,count){
            
            console.log(count);
            console.log(err);
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(req.body);//or return count for 1 & 0
            }
        });
});
        });
});
router.post('/:id',function(req,res,next){
  Product.deleteAll(req.body,function(err,count){
    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json(count);
    }
  });
});
router.delete('/:id',function(req,res,next){

        Product.deleteProduct(req.params.id,function(err,count){

            if(err)
            {
                res.json(err);
            }
            else
            {
                res.json(count);
            }

        });
});
router.put('/:id',function(req,res,next){

    Product.updateProduct(req.params.id,req.body,function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});


router.get('/order/:id',function(req,res,next){
if(req.params.id){
    Product.getProductByOrderId(req.params.id,function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
  }
});
module.exports=router;