const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: "localhost",
  user: "app",
  password: "App.2023",
  database: "db_clande",
  waitForConnections: true,
  connectionLimit: 10, // Adjust this based on your requirements
  queueLimit: 0,
});

module.exports = pool;
