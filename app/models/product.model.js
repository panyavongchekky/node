const { error } = require("console");
const sql = require("./db");
const { response } = require("express");
const e = require("express");
const product = function (product) {
                    this.pro_name = product.pro_name;
                    this.price = product.price;
                    this.cat_id = product.cat_id;

};


product.getALL = result =>{
                    sql.query("SELECT * FROM products",(err,res) =>{
                     if (err){
                    console.log ("Error: ",err);
                    result(null,err);
                    return;
                    }
                    console.log("product: ",res);
                    result(null, res)
                    });
};


//ວຶທີເພ່ີມສີ້ນຄ້າໃຫມ່

product.create = (newproduct, result) =>{
                    console.log(newproduct)
                    sql.query("INSERT INTO products SET ?" , newproduct,(error, response) =>{
                          if(error){
                             console.error(error);
                             result(error , null);
                             return;
                    }
                    result(null , {id: response.insertId, ...newproduct});
         
                    });
};

//ອັດດບສີ້ນຄ້າດ້ວຍລະຫັດ

product.updateById = (id, updatedproduct, result) =>{
                    sql.query("UPDATE products SET ? WHERE id = ?", [updatedproduct, id],(error, response) =>{
                    if (error){
                         console.error(error);
                         result(error, null);
                         return;
                    }
                    if (response.affectedRows == 0){
                         //ບໍ່ເຫັນລະຫັດຕາມລະຫັດທີ່ລະບຸ
                         result({ kind: "not_found"}, null);
                         return;
                    }
                    result(null , {id: id, ...updatedproduct});

                    }
                    );
};

//ລົບສີ້ນຄ້າດ້ວຍລະຫັດ
product.remove = (id, result) =>{
                    sql.query("DELETE FROM products WHERE id =?",id,(error,response) =>{
                     if(error){
                     console.error(error);
                     result(error, null);
                     return;                
                     }
                     if (response.affectedRows == 0) {
                      //ບໍ່ເຫັນລະຫັດຕາມລະຫັດທີ່ລະບຸ 
                    result({ kind: "not_found"}, null);
                    return;   
                     }
                     result(null , response);
                    });
};


module.exports = product;
