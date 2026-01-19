import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/app/lib/dbConnect";
import UserModel from "@/app/model/UserModel";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        await dbConnect();
        const admin = await UserModel.findOne({ email });

        // ❌ User not found
        if (!admin) {
          return null;
        }

        // ❌ Password mismatch
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
          return null;
        }

        // ❌ Not admin
        if (String(admin.usertype) !== "2") {
          throw new Error("NOT_ADMIN");
        }

        // ✅ Success
        return {
          id: admin._id.toString(),
          name: admin.name,
          email: admin.email,
          usertype: String(admin.usertype),
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.usertype = String(user.usertype);
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.usertype = String(token.usertype);
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
