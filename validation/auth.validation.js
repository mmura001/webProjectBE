const joi = require('joi')

const signUpSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
})
const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})
const updateSchema = joi.object({
    email: joi.string().email().required(),
    username: joi.string().required()
})

module.exports = { loginSchema, signUpSchema, updateSchema}