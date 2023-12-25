const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    images: Array,
    user_id: String,
    description: String,
    amount: Number,
  },
  { timestamps: true }
);

exports.ProductModel = mongoose.model("products", productSchema);

exports.validateProducts = (reqBody) => {
  const JoiSchema = Joi.object({
    title: Joi.string().min(2).max(9999).required(),
    price: Joi.number().min(2).max(9999).required(),
    images: Joi.array().min(1).max(9999).allow(null, ""),
    description: Joi.string().min(1).max(9999).allow(null, ""),
  });
  return JoiSchema.validate(reqBody);
};
