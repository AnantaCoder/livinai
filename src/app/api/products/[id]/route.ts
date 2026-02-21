import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";
import mongoose from "mongoose";

export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "seller" && session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Only sellers can update products" },
        { status: 403 },
      );
    }

    const { id } = params;
    const body = await req.json();

    await dbConnect();

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    // Check ownership
    // Convert session user id to string for comparison and product sellerId to string
    // Check ownership
    // Handle both populated and unpopulated sellerId
    const sellerId = (product.sellerId._id || product.sellerId).toString();
    if (sellerId !== session.user.id && session.user.role !== "admin") {
      console.error(
        "Forbidden update: Product owned by " +
          sellerId +
          ", user is " +
          session.user.id,
      );
      return NextResponse.json(
        { message: "Forbidden: You can only update your own products" },
        { status: 403 },
      );
    }

    // Update fields
    if (body.name) product.name = body.name;
    if (body.description) product.description = body.description;
    if (body.price) product.price = body.price;
    if (body.category) product.category = body.category;
    if (body.images) product.images = body.images;
    if (body.stock !== undefined) product.stock = body.stock;
    if (body.categoryId) product.categoryId = body.categoryId;

    const savedProduct = await product.save();

    return NextResponse.json(savedProduct);
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    await dbConnect();

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    // Check ownership
    if (
      product.sellerId.toString() !== session.user.id &&
      session.user.role !== "admin"
    ) {
      return NextResponse.json(
        { message: "Forbidden: You can only delete your own products" },
        { status: 403 },
      );
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
