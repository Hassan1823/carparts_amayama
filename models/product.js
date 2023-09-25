import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  orderStatus: {
    type: Boolean,
    default: false,
  },
  productName: {
    type: String,
  },
  number: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
