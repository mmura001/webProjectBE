const joi = require("joi");

const insertSchema = joi.object({
  etd_file_id: joi.string().optional(),
  advisor: joi.string().optional(),
  author: joi.string().optional(),
  degree: joi.string().optional(),
  program: joi.string().optional(),
  title: joi.string().required(),
  university: joi.string().optional(),
  year: joi.string().optional(),
  text: joi.string().optional(),
  wikifier_terms: joi.string().optional(),
});

module.exports = { insertSchema };
