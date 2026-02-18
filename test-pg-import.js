import pg from 'pg';
try {
    const { Pool } = pg;
    console.log('Pool is available:', !!Pool);
} catch (e) {
    console.error('Error importing pg:', e);
}
