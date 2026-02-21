import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import Order from "@/lib/models/Order";

// PATCH - Update order status
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Only sellers and admins can update order status
    if (session.user.role !== "seller" && session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Only sellers can update orders" },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { status } = body;

    if (!status || !["pending", "completed", "cancelled"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    await dbConnect();

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    ).populate("buyerId", "name email");

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
