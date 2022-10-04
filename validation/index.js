const { loginSchema: login, signUpSchema: signup, updateSchema: update } = require('./auth.validation')


module.exports = { login, signup, update }