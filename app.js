const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

// Middleware

app.use(cors());
app.use(express.json());

// Database connection creation

function createDBConnection() {
  return mysql.createConnection({
    host: "10.0.100.109",
    user: "app",
    password: "Clandestinos.2022",
    database: "db_clande",
  });
}

let db = createDBConnection();

// Attempt to connect to the database
function connectToDB() {
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      // Attempt to reconnect after a delay
      setTimeout(connectToDB, 2000); // Adjust the delay as needed
    } else {
      console.log('Connected to MySQL database');
    }
  });

  // Handle disconnection
  db.on('error', (err) => {
    console.error('MySQL error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') {
      console.error('MySQL connection was lost. Attempting to reconnect...');
      db = createDBConnection(); // Create a new connection
      connectToDB(); // Attempt to reconnect
    } else {
      throw err;
    }
  });
}

connectToDB(); // Initial connection

module.exports = {
  getDb: () => db, // Export a function to retrieve the current db connection
};

const torneosRoutes = require("./routes/torneos");
const jugadoresRoutes = require("./routes/jugadores");
const partidosRoutes = require("./routes/partidos");
// Routes

app.use("/torneos", torneosRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
