const express = require('express')
const app = express()
const mysql = require('./db')
const cors = require('cors')
require('dotenv').config(); 
const port = process.env.PORT || 5000
const exhibitionRouter = require('./router/exhibition');
const userRouter = require('./router/user')
const docentRouter = require('./router/docent')
const loginRouter = require('./router/login')
const questionRouter = require('./router/question')
const answerRouter = require('./router/answer')
const qnaRouter = require('./router/qna')
const reviewRouter = require('./router/review')

app.use(express.json())
app.use(cors())
app.use(express.static('client'))

app.listen(port, () => console.log(`${port}`))

app.get('/', (req, res) => {
  res.send("hi")
})

app.use('/api/exhibition', exhibitionRouter)

app.use('/api/user', userRouter)
app.use('/api/docent', docentRouter)

app.use('/api/login', loginRouter)

app.use('/api/qna', qnaRouter)

app.use('/api/question', questionRouter)
app.use('/api/answer', answerRouter)

app.use('/api/review', reviewRouter)