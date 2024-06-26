const mysql = require("mysql");
require('dotenv').config()
//const dbConfig = require("../Config/db.config.js");

const connection = mysql.createConnection({
host:process.env.HOST,    //envເກັບໃນແລັບ
user:process.env.USER,
password:process.env.PASSWORD,
database: process.env.DB
});

connection.connect(error => {
 if(error) throw error;
 console.log("Successfully connected to the database");
});


module.exports = connection;