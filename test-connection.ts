import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pkg from 'pg'

async function main() {
    console.log('Testing Prisma Connection...');

    try {
        const { Pool } = pkg
        console.log('Pool imported:', !!Pool);

        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL is missing');
        }
        console.log('DATABASE_URL starts with:', process.env.DATABASE_URL.substring(0, 15));

        const pool = new Pool({ connectionString: process.env.DATABASE_URL })
        console.log('Pool created');

        const adapter = new PrismaPg(pool)
        console.log('Adapter created');

        const prisma = new PrismaClient({ adapter })
        console.log('PrismaClient instantiated');

        const count = await prisma.demoRequest.count();
        console.log('Connection successful! DemoRequest count:', count);

        await prisma.$disconnect();
    } catch (e) {
        console.error('Connection failed:', e);
        process.exit(1);
    }
}

main();
