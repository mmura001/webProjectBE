//* routes/signup.js
const express = require('express')
const router = express.Router()

router.get('/test', (req, res, next) => {
   
    res.json({ post: "test" })
})



module.exports = router;