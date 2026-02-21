// src/lib/api/auth.ts
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: "buyer" | "seller" | "admin";
}

export interface RegisterResponse {
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export class AuthAPI {
  private static baseUrl = "/api";

  static async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await fetch(`${this.baseUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Registration failed");
    }

    return result;
  }
}
