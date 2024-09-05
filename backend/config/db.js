const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function connectToDatabase() {
    return pool.getConnection(); // Retorna uma conexão do pool
}

module.exports = { connectToDatabase };