import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Validate required environment variables
if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("Missing environment variable: GOOGLE_CLIENT_ID");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing environment variable: GOOGLE_CLIENT_SECRET");
}

// Now TypeScript knows these variables are defined
const googleClientId: string = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret: string = process.env.GOOGLE_CLIENT_SECRET;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
};

export default NextAuth(authOptions);


