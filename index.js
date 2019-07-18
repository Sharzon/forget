const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongoose = require('mongoose')

const unless = require('./utils/unless')
const { protect } = require('./utils/auth')
const authRouter = require('./api/auth')
const userRouter = require('./api/user')

const app = express()

const port = process.env.PORT || 3001
app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRouter)

app.use('/api', unless('/api/auth', protect))
app.use('/api/users', userRouter)


mongoose.connect('mongodb://localhost:27017/forget', {
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(() => {
    app.listen(port, function() {
      console.log("Runnning on " + port)
    })
  })
  .catch(e => {
    console.error(e)
  })
