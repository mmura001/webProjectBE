//* routes/signup.js
const express = require("express");
const router = express.Router();
const Validator = require("../middleware/Validator");
const db = require("../db");
const { v4: uuidv4 } = require("uuid");
const util = require("util");

router.post("/generate", Validator("generateKey"), async (req, res, next) => {
  const query = util.promisify(db.query).bind(db);
  const { email } = req.body;
  const result = await query("SELECT * from loginuser WHERE email= ?;", email);
  // A user is found
  if (result.length > 0) {
    // generate a new key
    const uuid = uuidv4();
    const insertQuery = await query(
      "UPDATE loginuser SET apiKey = ? WHERE email= ? ;",
      [uuid, email]
    );
    console.log("the key is", insertQuery);
    return res.status(200).json({
      key: uuid,
    });
  } else {
    return res.status(400).json({ error: "user not found" });
  }
});

module.exports = router;
