// src/lib/api/products.ts
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  sellerId: string | { _id: string; name: string; email: string };
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
}

export class ProductsAPI {
  private static baseUrl = "/api/products";

  static async getProducts(): Promise<Product[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  }

  static async createProduct(data: CreateProductRequest): Promise<Product> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create product");
    }

    return response.json();
  }

  static async updateProduct(
    id: string,
    data: Partial<CreateProductRequest>,
  ): Promise<Product> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update product");
    }

    return response.json();
  }

  static async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete product");
    }
  }
}
