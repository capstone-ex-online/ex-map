const express = require('express')
const router = express.Router()
const { pool } = require('../db')

const loadExTable = async() => {
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

router.get('/', async (req, res) => {
  let exData = await loadExTable()
  res.send(exData)
})

module.exports = router