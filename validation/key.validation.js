const joi = require("joi");

const generateKeySchema = joi.object({
  email: joi.string().email().required(),
});

module.exports = { generateKeySchema };
