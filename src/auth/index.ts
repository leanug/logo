import NextAuth from "next-auth"

import authConfig from "./auth.config"
import User from "@/models/user"
import { connectDB } from '@/utils/connectDB'
import { MongoDBAdapter } from "@auth/mongodb-adapter"

// Define authOptions
export const {handlers, signIn, signOut, auth} = NextAuth ({
  adapter: MongoDBAdapter(connectDB),
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    session({ session, token }: { session: any, token: any}) {
      const { user, expires } = session;
      return {
        expires, // Keep the `expires` property
        user: {
          ...user, // Spread the existing user properties
          id: token.sub, // Include the `id` property
        },
      };
    },
  },
  events: {
    async linkAccount({user}) {
      try {
        await connectDB();

        // Update the emailVerified field with the current date
        await User.findByIdAndUpdate(user.id, {
          emailVerified: new Date(),
        })
      } catch (error) {
        console.error('Error updating emailVerified field:', error)
      }
    }
  }
})
