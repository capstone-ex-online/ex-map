const express = require('express')
const router = express.Router()

const mysql = require('../db')

router.get('/', (req, res) => {
  const connection = mysql.init()
  // console.log(await mysql.send_exhi_data(connection))
  // res.send(mysql.send_exhi_data(connection))
})

module.exports = router