import { env } from '$env/dynamic/private'
import { building } from '$app/environment'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

let prismaStub: PrismaClient

if (building) {
  // During build, we prevent any database connection attempts or validation failures
  // by using a Proxy that mocks the PrismaClient interface.
  prismaStub = new Proxy({}, {
    get: (target, prop) => {
      if (typeof prop === 'string' && (prop === 'then' || prop === 'catch')) return undefined;
      return new Proxy({}, {
        get: () => () => Promise.resolve()
      });
    }
  }) as unknown as PrismaClient;
} else {
  const { Pool } = pg
  const connectionString = env.DATABASE_URL

  console.log('[Prisma] Initializing...');
  console.log('[Prisma] Connection string present:', !!connectionString);
  console.log('[Prisma] PG Import:', !!pg, typeof pg);

  if (!connectionString) {
    console.error('[Prisma] DATABASE_URL is missing from $env/dynamic/private');
    throw new Error('DATABASE_URL is missing from $env/dynamic/private')
  }

  console.log('[Prisma] Creating Pool...');
  const pool = new Pool({ connectionString })
  console.log('[Prisma] Pool created:', !!pool);

  console.log('[Prisma] Creating Adapter...');
  const adapter = new PrismaPg(pool)
  console.log('[Prisma] Adapter created:', !!adapter);

  console.log('[Prisma] Instantiating PrismaClient...');
  prismaStub = global.prisma || new PrismaClient({ adapter, log: ['query', 'info', 'warn', 'error'] })
  console.log('[Prisma] Client instantiated');
}

const prisma = prismaStub

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

export { prisma }

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}
