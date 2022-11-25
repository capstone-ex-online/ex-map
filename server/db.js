const mysql = require('mysql2/promise')
require('dotenv').config(); 

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
})

module.exports = { pool }