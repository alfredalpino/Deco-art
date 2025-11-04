import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  });

// Handle graceful shutdown
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
} else {
  // In production, handle disconnection on process termination
  process.on('beforeExit', async () => {
    await prisma.$disconnect();
  });
}

// Connection error handler
prisma.$on('error' as never, (e: never) => {
  console.error('Prisma Client Error:', e);
});
