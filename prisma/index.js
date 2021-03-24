import { PrismaClient } from '@prisma/client'; // Prisma ORM

let prisma; // Declare client

// If running in production
if (process.env.NODE_ENV === 'production') {
  // Instantiate client
  prisma = new PrismaClient();
} else {
  // If prisma not in global scope
  if (!global.prisma) {
    // Instantiate and bind to global scope
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export default prisma; // Export client
