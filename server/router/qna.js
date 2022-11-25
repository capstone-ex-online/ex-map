const express = require('express')
const router = express.Router()
const { pool } = require('../db')

const loadQnaList = async() => {
  try {
    const connection = await pool.getConnection(async conn => conn)

    const queryForQuestion = `SELECT question_content, question_id, question_title FROM question`
    let queryForAnswerCount = ``

    try {
      const [questionRows] = await connection.query(queryForQuestion)
      for(let i = 0; i<questionRows.length; i++) {
        queryForAnswerCount = `SELECT COUNT(*) AS answerCnt FROM answer WHERE qid = ${questionRows[i].question_id}`
        questionRows[i]['answer_count'] = queryForAnswerCount[0].answerCnt
      }
      connection.release()
      return questionRows
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

const getAnswersByQid = async(req) => {
  const qid = req.body.qid

  const query = `SELECT answer_content, answer_img, answer_title FROM answer WHERE qid = ?`

  try {
    const connection = await pool.getConnection(async conn => conn)
		try{
	    const [answerResult] = await connection.query(query, qid)
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

router.post('/', async (req, res) => {
  let QnaData = await loadQnaList()
  res.send(QnaData)
})

router.post('/answer', async (req, res) => {
  let answerRes = await getAnswersByQid(req)
  res.send(answerRes)
})

module.exports = router