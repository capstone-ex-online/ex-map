const mysql = require('mysql2/promise')
require('dotenv').config(); 

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
})

const dbTest = async() => {
  try {
    const connection = await pool.getConnection(async conn => conn)

    try {
      const [rows] = await connection.query('SELECT * FROM exhibition')
      connection.release()
      return rows
    } catch(err) {
      console.log('Query error')
      connection.release()
      return false
    }

  } catch(err) {
    console.log('DB error')
    return false
  }
}

module.exports = { pool, dbTest }