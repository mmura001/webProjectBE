const {
  loginSchema: login,
  signUpSchema: signup,
  updateSchema: update,
} = require("./auth.validation");
const { insertSchema: insert } = require("./search.validator");
const { generateKeySchema: generateKey } = require("./key.validation");

module.exports = { login, signup, update, insert, generateKey };
