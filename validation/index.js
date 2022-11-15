const {
  loginSchema: login,
  signUpSchema: signup,
  updateSchema: update,
} = require("./auth.validation");
const { insertSchema: insert } = require("./search.validator");

module.exports = { login, signup, update, insert };
