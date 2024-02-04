require('dotenv').config();

let host = process.env.DB_HOST
let port = process.env.DB_PORT
let user = process.env.DB_USER
let password = process.env.DB_PASSWORD

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host,
  // port: 3306,
  database: 'blog',
  user,
  password,
});

module.exports = pool;