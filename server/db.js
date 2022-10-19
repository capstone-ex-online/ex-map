const mysql = require('mysql')
require('dotenv').config(); 

module.exports = function() {
  return {
    init: function () {
      return mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DB_PORT
      })
    },

    open: function(con) {
      con.connect(function(err) {
        if(err) {
          console.log('Database connection error: '+err)
        } else {
          console.log('Database is connected successfully.')
        }
      })
    }
  }
}