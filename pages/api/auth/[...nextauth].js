import NextAuth from 'next-auth'; // Next Authentication
import prisma from '@prisma/index'; // Prisma client
import Adapters from 'next-auth/adapters'; // Next Authentication adapters
import Providers from 'next-auth/providers'; // Next Authentication providers

// Database Configuration
const databaseConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DBNAME,
  // Bypass SSL rejectUnauthorized (Heroku, etc)
  ssl: {
    sslmode: 'require',
    rejectUnauthorized: false,
  },
};

export default NextAuth({
  // Site URL
  site: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  // Supported authentication providers
  providers: [
    // Email authentication
    Providers.Email({
      server: process.env.NA_EMAIL_SERVER, // SES mailserver
      from: process.env.NA_EMAIL_FROM, // From address for authentication emails
      maxAge: 24 * 60, // 1 hour max life for login request
    }),
  ],
  // Custom DB adapter
  adapter: Adapters.Prisma.Adapter({
    // Pass PrismaClient
    prisma,
    // Map custom models from Prisma schema
    modelMapping: {
      User: 'user',
      VerificationRequest: 'verificationRequest',
    },
  }),
  pages: {
    // On errors, redirect to home
    error: '/',
  },
  // Session handling
  session: {
    jwt: true, // Enable JSON Web Token
    maxAge: 30 * 24 * 60 * 60, // Expiry: 1 month
    updateAge: 0, // Update JWT on each login
  },
  jwt: {
    // JWT secret
    secret: process.env.NA_JWT_SECRET,
  },
  // Handle administrator access
  callbacks: {
    // On session request
    session: async (session, user) => {
      // Attach user role to session
      session.role = user.role;

      // Return altered session
      return Promise.resolve(session);
    },
    // On JWT request (runs before session request)
    jwt: async (token, user) => {
      // If user exists, collect user role and assign to token
      user ? (token.role = user.role) : null;

      // Return altered token
      return Promise.resolve(token);
    },
  },
  // Pass previously configured database config
  database: databaseConfig,
});
