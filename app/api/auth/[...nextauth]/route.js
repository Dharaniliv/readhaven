

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import connectToDatabase from '@/app/lib/db/mongo';
import User from '@/app/lib/models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
      
        await connectToDatabase();

     
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('It seems like you don’t have an account yet. Please sign up.');
        }
        if (!user.password) {
          throw new Error('Looks like you signed up with Google—please continue with Google.');
        }

     
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) {
          throw new Error('Invalid credentials');
        }

     
        return {
          id:      user._id.toString(),
          email:   user.email,
          name:    user.name,
          isAdmin: user.isAdmin || false,
        };
      },
    }),

    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        
        await connectToDatabase();

        
        let user = await User.findOne({ email: profile.email });
        if (!user) {
          user = await User.create({
            email:    profile.email,
            name:     profile.name,
            googleId: profile.sub || profile.id,
          });
        }

      
        return {
          id:      user._id.toString(),
          email:   user.email,
          name:    user.name,
          isAdmin: user.isAdmin || false,
        };
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge:   30 * 24 * 60 * 60, 
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id      = user.id;
        token.email   = user.email;
        token.name    = user.name;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },

    async session({ session, token }) {
      await connectToDatabase();
      const freshUser = await User.findById(token.id).lean();
      if (freshUser) {
        session.user.id      = freshUser._id.toString();
        session.user.email   = freshUser.email;
        session.user.name    = freshUser.name;
        session.user.isAdmin = freshUser.isAdmin || false;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },

  pages: {
    signIn: '/signup',
    error:  '/signup',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
