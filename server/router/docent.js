const express = require('express')
const router = express.Router()
const { pool } = require('../db')
const upload = require('../modules/multer')

const docentSignUp = async(req) => {
  const id = req.body.id
  const username = req.body.username
  const password = req.body.password
  const authimage = req.file.location

  const query = 'INSERT INTO docent (docent_id, docent_pwd, docent_name, docent_auth) VALUES (?, ?, ?, ?)'

  try {
    const connection = await pool.getConnection(async conn => conn)

    try {

      const result = await connection.query(query, [id, password, username, authimage])
      connection.release()
      return { success: true }

    } catch(err) {

      console.log(err)
      connection.release()
      return { message: "fail", success: false }

    }

  } catch(err) {
    console.log(err)
    return { err: err, success: false }
  }
}

const getAnswersByDocent = async(req) => {
  const id = req.body.id

  const query = `SELECT answer_content, answer_title FROM answer WHERE answer_writer = ?`

  try {
    const connection = await pool.getConnection(async conn => conn)
		try{
	    const [answerResult] = await connection.query(query, id)
			connection.release()
			return answerResult
		} catch(err) {
			console.log('Query error')
      connection.release()
      return false
		}
  } catch(err) {
    console.log(err)
    return { err: err, success: false }
  }
  
}

const getInfoByDocent = async(req) => {
  try {
    const connection = await pool.getConnection(async conn => conn)

    const queryForInfo = `SELECT docent_id, docent_name, docent_email, docent_img FROM docent`
    let queryForAnswerCount = ``
    try {
      const [infoRows] = await connection.query(queryForInfo)
      for(let i = 0; i<infoRows.length; i++) {
        queryForAnswerCount = `SELECT COUNT(*) AS answerCnt FROM answer WHERE answer_writer = '${infoRows[i].docent_id}'`
        const answer = await connection.query(queryForAnswerCount)
        infoRows[i]['answer_count'] = answer[0][0].answerCnt
      }
      connection.release()
      return infoRows
    } catch(err) {
      console.log('Query error')
      console.log(err)
      connection.release()
      return false
    }
  } catch(err) {
    console.log(err)
  }

}

router.post('/signup', upload.single('image'), async (req, res) => {
  let signUpRes = await docentSignUp(req)
  res.send(signUpRes)
})

router.post('/answer', async (req, res) => {
  let answerRes = await getAnswersByDocent(req)
  res.send(answerRes)
})

router.post('/info', async (req, res) => {
  let infoRes = await getInfoByDocent(req)
  res.send(infoRes)
})

module.exports = router