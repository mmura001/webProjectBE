//* routes/signup.js
const express = require('express')
const createHttpError = require('http-errors')
const bcrypt = require("bcrypt");
const router = express.Router()
const Validator = require('../middleware/Validator')
const db = require('../db')
const saltRounds = 10;

router.post('/register', Validator('signup'), async (req, res, next) => {
    console.log("THE INPUT", req.body)
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hash = await bcrypt.hash(password, saltRounds);
      db.query(
        "INSERT INTO loginuser (username,email,password) VALUES (?,?,?)",
        [username, email, hash],
    async(err, result, fields) => {
        if(err){
            console.log("There was an error", err);
            if(err.errno === 1062){
                res.status(400).json({
                    error:{
                        status: 400,
                        message: "user already exists"}
                })
            }else{
                res.status(500).json({
                    message: "There was an error"
                })
            }
        } else {
            res.json({ user: req.body })
        }
    })
})

router.post('/login', Validator('login'), async (req, res, next) => {
        console.log("THE INPUT", req.body)
        const email = req.body.email;
        const password = req.body.password;
        const hash = await bcrypt.hash(password, saltRounds);
          db.query(
            "SELECT * FROM loginuser WHERE email = ?;",
            email,
        async(err, result, fields) => {
            if(err){
                console.log("There was an error", err);
                if(err.errno === 1062){
                    res.status(400).json({
                        error:{
                            status: 400,
                            message: "user already exists"}
                    })
                }else{
                    res.status(500).json({
                        message: "There was an error"
                    })
                }
            } else {
                console.log(JSON.stringify(result));
                    if (result.length > 0) {
                        bcrypt.compare(password, result[0].password, (error, response) => {
                            if (response) {
                                // req.session.user = result;
                                // console.log(req.session.user);
                                res.status(200).json({ username: result[0].username, email: result[0].email })
                                } else {
                                    res.status(403).send({error:{
                                        message:"Wrong username/password combination!user already exists"} 
                                    });
                                }
                            });
                    }
                    else {
                        console.log(" No I am here")
                        res.status(402).send({ error:{
                            status: 404,
                            message:"There was an error"} 
                            });
                        }
                
            }
        })
    }
)
    
router.put('/profileusername',Validator('update'),async(req,res,next) =>{
    const email = req.body.email;
    const username = req.body.username;
    console.log("profile update")
    db.query("UPDATE loginuser SET username = ? WHERE email = ?;",
    [username, email],
    async(err,result,field) =>{
        if(err){
            console.log("There was an error here", err);
            if(err.errno === 1062){
                res.status(400).json({
                    error:{
                        status: 400,
                        message: "unot updated"}
                })
            }else{
                console.log("There was an error", err);
                res.status(500).json({
                    message: "There was an error"
                })
            }
        } else {
            console.log(JSON.stringify(result));
            var response = JSON.stringify(result)

                        if (response) {
                            // req.session.user = result;
                            // console.log(req.session.user);
                            res.status(200).json({ username: username, email: email })
                            } else {
                                res.status(403).send({error:{
                                    message:"Wrong username/password combination!user already exists"} 
                                });
                            }
        }
    })
}    
    
)

module.exports = router;