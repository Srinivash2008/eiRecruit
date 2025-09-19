// src/config/dbConfig.js
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const { BASE_URL, LOCALHOST_PASSWORD, LOCALHOST_DB, DB_USER, NODE_ENV } = process.env;

const connectionPoolConfig = {
    development: {
        connectionLimit: 1,
        host: BASE_URL,
        user: DB_USER,
        password: LOCALHOST_PASSWORD,
        database: LOCALHOST_DB,
    },
    production: {
        connectionLimit: 10,
        host: BASE_URL,
        user: DB_USER,
        password: LOCALHOST_PASSWORD,
        database: LOCALHOST_DB,
    },
};

const environment = NODE_ENV || 'development';

const pool = mysql.createPool(connectionPoolConfig[environment]);

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to the database.');
        connection.release();
    }
});

export default pool;
