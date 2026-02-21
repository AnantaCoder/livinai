import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard"); // Example protected route
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
