const express = require('express')
const router = express.Router()
const { pool } = require('../db')

const userSignUp = async(req) => {
  const id = req.body.id
  const username = req.body.username
  const password = req.body.password

  const query = 'INSERT INTO user (user_id, user_pwd, user_name) VALUES (?, ?, ?)'

  try {
    const connection = await pool.getConnection(async conn => conn)

    try {

      const result = await connection.query(query, [id, password, username])
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

const getQuestionsByUser = async(req) => {
  const id = req.body.id

  const query = `SELECT question_content, question_title FROM question WHERE question_writer = ?`

  try {
    const connection = await pool.getConnection(async conn => conn)
		try{
	    const [questionResult] = await connection.query(query, id)
			connection.release()
			return questionResult
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

const getReviewsByUser = async(req) => {
  const id = req.body.id

  const query = `SELECT rev_content, rev_title FROM review WHERE rev_writer = ?`

  try {
    const connection = await pool.getConnection(async conn => conn)
		try{
	    const [reviewResult] = await connection.query(query, id)
			connection.release()
			return reviewResult
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

router.post('/signup', async (req, res) => {
  let signUpRes = await userSignUp(req)
  res.send(signUpRes)
})

router.post('/question', async (req, res) => {
  let questionRes = await getQuestionsByUser(req)
  res.send(questionRes)
})

router.post('/review', async (req, res) => {
  let reviewRes = await getReviewsByUser(req)
  res.send(reviewRes)
})

module.exports = router