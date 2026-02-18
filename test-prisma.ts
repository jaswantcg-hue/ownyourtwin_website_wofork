import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({
  url: './dev.db'
})
const prisma = new PrismaClient({ adapter })

async function main() {
  try {
    const request = await prisma.demoRequest.create({
      data: {
        name: 'Test',
        email: 'test' + Date.now() + '@test.com',
        phone: '123',
        interests: 'Test'
      }
    })
    console.log('Created request:', request)
  } catch (e) {
    console.error(e)
  }
}

main()
