const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('Connecting to', process.env.DATABASE_URL);
    await client.connect();
    console.log('Connected successfully!');
    const res = await client.query('SELECT NOW()');
    console.log('Current time in DB:', res.rows[0].now);
  } catch (err) {
    console.error('Connection error', err.stack);
  } finally {
    await client.end();
  }
}

testConnection();
