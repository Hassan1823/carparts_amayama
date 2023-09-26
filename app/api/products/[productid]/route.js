import { connectDB } from "@/db/db";
import { NextResponse } from "next/server";
import Product from "@/models/product";

// modiffy the data
export async function PUT(request, content) {
  try {
    await connectDB();
    const productId = content.params.productid;
    const filter = { email: productId };
    const payload = await request.json();
    // console.table(payload);

    const result = await Product.updateMany(filter, payload);
    // const result = []
    console.log("Product is updated");
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.log("Product PUT Error : ", error);
  }
}

// getting the updated data
export async function GET(request, content) {
  try {
    await connectDB();
    const productId = content.params.productid;
    const record = { email: productId };
    // const payload = await request.json();
    // console.table(record);

    const result = await Product.find(record);
    // const result = []
    // console.log("Getting PUT Products");
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.log("Product PUT Error in GET: ", error);
  }
}

// delete the data
export async function DELETE(request, content) {
  try {
    const productId = content.params.productid;
    const record = { _id: productId };
    await connectDB();
    const result = await Product.deleteOne(record);
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.log("DELETE Product Error : ", error);
  }
}
