// src/lib/api/orders.ts
export interface CreateOrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  items: CreateOrderItem[];
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  buyerId: {
    _id: string;
    name: string;
    email: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export class OrdersAPI {
  private static baseUrl = "/api/orders";

  static async getOrders(): Promise<Order[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    return response.json();
  }

  static async createOrder(data: CreateOrderRequest): Promise<Order> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create order");
    }

    return response.json();
  }

  static async updateOrderStatus(
    orderId: string,
    status: "pending" | "completed" | "cancelled",
  ): Promise<Order> {
    const response = await fetch(`${this.baseUrl}/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update order status");
    }

    return response.json();
  }
}
