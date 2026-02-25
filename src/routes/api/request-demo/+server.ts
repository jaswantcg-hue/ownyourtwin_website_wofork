import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import mssql from 'mssql';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    console.log('Received request data:', data);
    const { name, email,phone,interests } = data;

    // Basic validation
    if (!name || !email) {
      return json({ error: 'Name and email are required' }, { status: 400 });
    }

    console.log('Demo request received (no-op):', { name, email });
    const connectionString = 'Server=tcp:sqlserverscm.database.windows.net,1433;Initial Catalog=free-sql-db-3057187;Persist Security Info=False;User ID=jaswant;Password=Password@01;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;';

    const pool = new mssql.ConnectionPool(connectionString);

    await pool.connect();
    const query = pool.request();
    await query.query(`INSERT INTO ConsultationRequests (Application,name, email,phone,description) VALUES ('OwnYourTwin', '${name}', '${email}', '${phone}', '${interests}')`);
    await pool.close();

    return json({ success: true, message: 'Request received' });
  } catch (error) {
    console.error('Error processing demo request:', error);
    return json({ error: 'Failed to process request' }, { status: 500 });
  }
};
