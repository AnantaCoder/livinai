import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";

// GET all orders (for buyers - their orders, for sellers/admin - all orders)
export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    let orders;
    if (session.user.role === "buyer") {
      // Buyers see only their orders
      orders = await Order.find({ buyerId: session.user.id })
        .populate("buyerId", "name email")
        .sort({ createdAt: -1 });
    } else {
      // Sellers and admins see all orders
      orders = await Order.find({})
        .populate("buyerId", "name email")
        .sort({ createdAt: -1 });
    }

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new order
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { items } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: "Order must contain at least one item" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Verify products exist and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      // Check if this is a sample product (not in database)
      if (item.productId.toString().startsWith("sample-")) {
        return NextResponse.json(
          { message: "Please add real products to the database first. Sample products cannot be purchased." },
          { status: 400 }
        );
      }

      const product = await Product.findById(item.productId);
      if (!product) {
        return NextResponse.json(
          { message: `Product ${item.productId} not found` },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { message: `Insufficient stock for ${product.name}` },
          { status: 400 }
        );
      }

      totalAmount += product.price * item.quantity;
      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images[0] || "",
      });

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const newOrder = await Order.create({
      orderNumber,
      buyerId: session.user.id,
      items: orderItems,
      totalAmount,
      status: "pending",
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
