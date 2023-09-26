import NextAuth from "next-auth/next";

// local imports
import { connectDB } from "@/db/db";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    // Fetch all products from the database
    const products = await Product.find();
    return NextResponse.json({ products, success: true });
  } catch (error) {
    console.log("Product GET Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve products", success: false },
      { status: 500 }
    );
  }
}

export async function POST(req, res) {
  const payload = await req.json();
  try {
    await connectDB();
    // console.log("Received payload:", payload);
    let product = new Product(payload);
    const result = await product.save();
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.log("Product POST Error :", error);
    return NextResponse.json(
      { error: "Failed to create product", success: false },
      { status: 500 }
    );
  }
}
