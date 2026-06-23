const fs = require('fs');
const { Client } = require('pg');
require('dotenv').config();

async function runMigration() {
  let sql = fs.readFileSync('schema.sql', 'utf16le');
  if (sql.charCodeAt(0) === 0xFEFF) {
    sql = sql.slice(1);
  }
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to DB, executing schema...');
    await client.query(sql);
    console.log('Schema created successfully!');
  } catch (err) {
    console.error('Error executing schema:', err.message);
  } finally {
    await client.end();
  }
}

runMigration();
