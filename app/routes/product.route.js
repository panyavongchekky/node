const auth = require('./anthen.route');
module.exports = app =>{
                    const products = require("../contrillers/product.controller.js");
                     app.get("/products",products.findAll);
                 //   app.get("/products" ,auth,products.findAll);
                    app.post("/products" ,auth,products.create);
                    app.put("/products/:id" ,auth,products.update);
                    app.delete("/products/:id" ,auth,products.delete);
} 