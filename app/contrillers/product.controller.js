const { error } = require("console");
const product =  require("../models/product.model.js");

exports.findAll = (req, res) => {
                    product.getALL ((err, data) =>{
                                        if (err)
                                        res.status(500).send ({
                    message:err.message || "error fetch produces"
                    });
                      else res.send(data);
                    });
};



exports.create = (req, res) =>{
//ກວດເງືອນໄຂ
 if(!req.body.pro_name || !req.body.price || !req.body.cat_id){
    res.status(400).send({ message: "product name, price, and category ID cannot be empty!"});
    return;  
 }

 //ເພີມສີ້ນຄ້າ
const newproduct = new product({
  pro_name: req.body.pro_name,
  price: req.body.price,
  cat_id: req.body.cat_id
});

//ບັນທືກສີ້ນຄ້າລົງຖານຂໍ້ມຸນ
product.create(newproduct, (error, data) =>{
  if(error) {
    res.status(500).send({message: error.message || "some error occurred while creating the product."});
  }else{
    res.status(201).send(data);
  }
});
};


exports.update = (req, res) => {
  if(!req.body) {
      res.status(400).send({ message: "Date to update cannot be empty! " });
      return;
  }
  
  product.updateById(req.params.id, req.body, (error, data) => {
      if (error) {
           if (error.kind === "not_found") {
                res.status(404).send({ message: 'product with id $(req.parms.id) not fount.' });
           }  else {
               res.status(500).send({ message: 'Error updating product with id ${req.params.id}' });
           }
      } else {
        res.send(data);
      }
  });
};





exports.delete = (req, res) => {
      //ລົບຂໍ້ມຸນໃນຖານ
  product.remove(req.params.id, (error, data) => {
 if(error) {
    if (error.kind === "not_found") {
         res.status(404).send({ message: 'product with id ${req.params.id} not found.'});   
    } else {
        res.send(500).send({ message:'could not dalete product with id ${req.params.id}' });
    }
 }else{
    res.send({ message: "product was dalated successfully! "});
 }
  });
};