require('dotenv').config()
const mysql = require('mysql2/promise');

// this is required for aiven DB connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 20000,
  ssl: {
    rejectUnauthorized: false
  }
});

async function executeQuery(query, params) {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.query(query, params);
    return results;
  } catch (err) {
    if (err.code === "ECONNRESET") {
      console.error("Connection was reset...");
    }
    else if (err.code === "ETIMEDOUT") {
      console.error("MySQL connection timed out. Attempting to reconnect......");
    }
    else if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("🔌 MySQL connection lost. Reconnecting...");
    }
     else {
      console.error(err);
    }
    return false; 
  } finally {
    connection.release();
  }
}

module.exports = {
    executeQuery
}
