require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const indexRouter = require('./routes/index')
const cors = require('cors')
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const notFound = new Error('Not Found')
  notFound.status = 404
  notFound.name = 'Not Found'
  notFound.errorCode = 'NOT_FOUND'
  next(notFound)
})

/* eslint-disable */
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: err.message,
    name: err.name,
    errorCode: err.errorCode,
    stack: err.stack,
    details: err.details,
  })
})
/* eslint-enable */

module.exports = app
