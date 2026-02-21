// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const products = await Product.find({})
      .populate("sellerId", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Fetch products error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "seller" && session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Only sellers can add products" },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { name, description, price, category, images, stock } = body;

    if (!name || !description || !price || !category || !images || !stock) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    await dbConnect();

    // Re-verify category to add id
    let categoryId = null;
    try {
      const Category = (await import("@/lib/models/Category")).default;
      const cat = await Category.findOne({ name: category });
      if (cat) categoryId = cat._id;
    } catch {}

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      categoryId,
      images, // Array of secure URLs from frontend upload or pre-signed URL upload
      stock,
      sellerId: session.user.id,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
