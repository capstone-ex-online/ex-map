const express = require('express')
const router = express.Router()
const { pool } = require('../db')

const login = async(req) => {
  const id = req.body.id
  const password = req.body.password

  const queryForUser = "SELECT * FROM user WHERE user_id = ? AND user_pwd = ?"
  const queryForDocent = "SELECT * FROM docent WHERE docent_id = ? AND docent_pwd = ?"

  try {
    const connection = await pool.getConnection(async conn => conn)

    const userResult = await connection.query(queryForUser, [id, password])
    if(userResult[0].length > 0) {
      connection.release();
      return { success: true, loginId: id, loginState: 'user', loginName: userResult[0][0].user_name };
    }

    const docentResult = await connection.query(queryForDocent, [id, password])
    if(docentResult[0].length > 0) {
      connection.release();
      return { success: true, loginId: id, loginState: 'docent', loginName: docentResult[0][0].docent_name };
    }

    connection.release()
    return { success: false, message: 'User information is neither in the user table nor in the docent table.' }

  } catch(err) {
    console.log(err)
    return { err: err, success: false }
  }
  
}

router.post('/', async (req, res) => {
  let loginRes = await login(req)
  res.send(loginRes)
})

module.exports = router;