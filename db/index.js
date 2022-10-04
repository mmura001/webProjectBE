const mysql = require('mysql');

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"wp",
});

db.connect(function(error){
    console.log(error)
})

module.exports = db