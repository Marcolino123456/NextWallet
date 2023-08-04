import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import prisma from "@/app/libs/prisma";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Please enter an email and password')
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });
        if (!user || !user?.hashedPassword) {
          throw new Error('No user Found')
        }
        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!passwordMatch) {
          throw new Error('Incorrect password')
        }

        return user
      }
    })
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }