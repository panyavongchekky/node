const express = require("express");
const bodyparser = require("body-parser");

const app = express();

 app.use(bodyparser.json());

 app.use(bodyparser.urlencoded({extended:true}));



 app.get("/", (req ,res) =>{
 res.json({message : "welcome to bezkoder express.application."});
 });

 require("./app/routes/product.route.js")(app);
 require('./app/routes/user.route.js')(app);
 
app.listen(3002, () => {
console.log("server is running on port 3000");
});    