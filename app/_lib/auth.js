import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user; // converted to boolean
    },
    async signIn({ user, account, profile }) {
      try {
        // check if signed-in user already in DB
        const existingGuest = await getGuest(user.email);

        // if signed-in user is a new user then create a new user record
        // important to await to get the details
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        // if no error
        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);

      //   get the guest details and then mutate the session object
      session.user.guestId = guest.id;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  handlers: { GET, POST }, // desctructured route handlers
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
