// src/auth.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import dbConnect from "@/lib/db";
import UserModel from "@/lib/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;

        await dbConnect();

        // Explicitly select password since it's hidden by default in schema
        const user = await UserModel.findOne({ email }).select("+password");

        if (user && (await bcrypt.compare(password as string, user.password))) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            _id: user._id.toString(),
          };
        } else {
          return null;
        }
      },
    }),
  ],
});
