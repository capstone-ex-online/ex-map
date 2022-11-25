const express = require('express')
const router = express.Router()
const { pool } = require('../db')
const upload = require('../modules/multer')

const queUpload = async(req) => {
  const title = req.body.title
  const writer = req.body.writer
  const content = req.body.content

  const query = `INSERT INTO question 
				(question_title, question_writer, question_content) 
				VALUES (?, ?, ?)`

  try {
    const connection = await pool.getConnection(async conn => conn)

    try {

      const result = await connection.query(query, [title, writer, content])
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

const queUploadWithImg = async(req) => {
  const title = req.body.title
  const writer = req.body.writer
  const content = req.body.content
  const image = req.file.location

  const query = `INSERT INTO question 
				(question_title, question_writer, question_content, question_img) 
				VALUES (?, ?, ?, ?)`

  try {
    const connection = await pool.getConnection(async conn => conn)

    try {

      const result = await connection.query(query, [title, writer, content, image])
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

router.post('/post/image', upload.single('image'), async (req, res) => {
  let uploadRes = await queUploadWithImg(req)
  res.send(uploadRes)
})

router.post('/post', async (req, res) => {
  let uploadRes = await queUpload(req)
  res.send(uploadRes)
})

module.exports = router