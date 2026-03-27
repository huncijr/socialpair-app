/**
 * Prisma client configuration for database connection
 */
import { PrismaClient } from '@prisma/client';

/**
 * Singleton Prisma client instance
 * Uses global object to prevent multiple instances in development
 */
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
