import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_osx0vfHE5kcm@ep-autumn-block-ai2ynpki-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require'
});

const res = await pool.query('SELECT id, name, email, phone, interests, "createdAt" FROM "DemoRequest" ORDER BY "createdAt" DESC');
console.log(`\nTotal records: ${res.rows.length}\n`);
console.table(res.rows);
await pool.end();
