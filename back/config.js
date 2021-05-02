const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'RRXfqg86', //Don't forget to change your password.
    database: 'wap-db', //Don't forget to change your DB.
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
