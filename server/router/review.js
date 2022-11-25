const express = require('express')
const router = express.Router()
const { pool } = require('../db')
const upload = require('../modules/multer')

const revUpload = async(req) => {
  const title = req.body.title
  const writer = req.body.writer
  const content = req.body.content
	const star = req.body.star

  const query = `INSERT INTO review (rev_title, rev_writer, rev_content, rev_star) VALUES (?, ?, ?, ?)`

  try {
    const connection = await pool.getConnection(async conn => conn)

    try {

      const result = await connection.query(query, [title, writer, content, star])
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

const revUploadWithImg = async(req) => {
  const title = req.body.title
  const writer = req.body.writer
  const content = req.body.content
	const star = req.body.star
  const image = req.file.location

  const query = `INSERT INTO review (rev_title, rev_writer, rev_content, rev_star, rev_img) VALUES (?, ?, ?, ?, ?)`

  try {
    const connection = await pool.getConnection(async conn => conn)

    try {

      const result = await connection.query(query, [title, writer, content, star, image])
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

const getReviewsByExId = async(req) => {
  const exId = req.body.exId

  const query = `SELECT rev_content, rev_img, rev_title, rev_star, rev_writer FROM review WHERE ex_id = ?`

  try {
    const connection = await pool.getConnection(async conn => conn)
		try{
	    const [reviewResult] = await connection.query(query, exId)
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

router.post('/post', async (req, res) => {
  let uploadRes = await revUpload(req)
  res.send(uploadRes)
})

router.post('/post/image', upload.single('image'), async (req, res) => {
  let uploadRes = await revUploadWithImg(req)
  res.send(uploadRes)
})

router.post('/exid', async (req, res) => {
  let reviewRes = await getReviewsByExId(req)
  res.send(reviewRes)
})

module.exports = router