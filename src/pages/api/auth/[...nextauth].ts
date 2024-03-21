import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

type ClientType = {
  clientId: string;
  clientSecret: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    } as ClientType),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>',
    // }),
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log('サインイン');
    //   return true;
    // },
    // async session({ session, user, token }) {
    //   session.user.id = 1;
    //   return session;
    // },
    // async jwt({ token, user, account, profile }) {
    //   console.log(`account:${JSON.stringify(account)}`);
    //   return token;
    // },
    // async session({ session, user, token }) {
    //   session.accessToken = token.accessToken;
    //   return session;
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   if (account) token.accessToken = account.access_token;
    //   return token;
    // },
  },
  secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);
