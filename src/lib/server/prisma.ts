import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({
  url: './dev.db'
})

const prisma = global.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

export { prisma }

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}
