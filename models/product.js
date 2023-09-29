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
  mainCategory:{
    type:String,
  },
  frame:{
    type:String,
  },
  subCategory:{
    type:String,
  },
  partGroup:{
    type:String,
  },
  partLink:{
    type:String,
  },
  productName: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  number: {
    type: Number,
  },
  price: {
    type: Number,
  },
  orderStatus: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
