import NextAuth from "next-auth";
import { authOptions } from "@/auth"; 

//const handler = NextAuth(authOptions);
const handler = NextAuth({
    ...authOptions,
    pages: {
      signIn: "/auth/signin",
      signOut: "/auth/signout",
      error: "/auth/error",
      verifyRequest: "/auth/verify-request",
      newUser: "/dashboard", // Нов потребител отива директно на дашборда
    },
  });

export { handler as GET, handler as POST };
