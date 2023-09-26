import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// local imports
import { connectDB } from "@/db/db";
import User from "@/models/user";

// const crypto = require('crypto');
// const secret = crypto.randomBytes(32).toString('hex');
// console.log(secret);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
        const sessionUser = await User.findOne({email: session.user.email})
      return session;
    },
    async signIn({ profile }) {
      // console.log(profile);
      try {
        await connectDB();
        const userExist = await User.findOne({email: profile.email})
        if(!userExist){
            const user = await User.create({
                email: profile.email,
                name: profile.name,
                image: profile.picture,
            })
        } 
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
