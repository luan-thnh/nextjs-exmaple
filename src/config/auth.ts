import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // This is a placeholder for JSONPlaceholder demo
        // In a real app, you would verify against a database
        if (credentials?.email === 'admin@example.com' && credentials?.password === 'password') {
          return {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
