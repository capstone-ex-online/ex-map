const express = require('express')
const router = express.Router()
const { pool } = require('../db')
const upload = require('../modules/multer')

const ansUpload = async(req) => {
  const title = req.body.title
  const writer = req.body.writer
  const content = req.body.content
	const qid = req.body.qid

  const query = `INSERT INTO answer (answer_title, answer_writer, answer_content, qid) VALUES (?, ?, ?, ?)`

  try {
    const connection = await pool.getConnection(async conn => conn)

    try {

      const result = await connection.query(query, [title, writer, content, qid])
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

const ansUploadWithImg = async(req) => {
  const title = req.body.title
  const writer = req.body.writer
  const content = req.body.content
	const qid = req.body.qid
  const image = req.file.location

  const query = `INSERT INTO answer (answer_title, answer_writer, answer_content, answer_img, qid) VALUES (?, ?, ?, ?, ?)`

  try {
    const connection = await pool.getConnection(async conn => conn)

    try {

      const result = await connection.query(query, [title, writer, content, image, qid])
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

router.post('/post', async (req, res) => {
  let uploadRes = await ansUpload(req)
  res.send(uploadRes)
})

router.post('/post/image', upload.single('image'), async (req, res) => {
  let uploadRes = await ansUploadWithImg(req)
  res.send(uploadRes)
})

module.exports = router