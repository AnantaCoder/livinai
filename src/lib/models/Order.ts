import mongoose from "mongoose";

export interface IOrderItem {
  productId: mongoose.Schema.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IOrder extends mongoose.Document {
  orderNumber: string;
  buyerId: mongoose.Schema.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  image: {
    type: String,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [OrderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Order ||
  mongoose.model<IOrder>("Order", OrderSchema);
