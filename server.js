const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const methodOverride = require('method-override')
const cors = require('cors')
const http = require('http')

const insecurePort = '8585'
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'server', 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(expressValidator())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

let v1APIRouter = require('./server/apis')

app.use('/api/v1', authMiddleware(), v1APIRouter)

function authMiddleware() {
  return (req, res, next) => {
    if (isAuthSkipRequired(req)) return next()
    return next()
  }
}

function isAuthSkipRequired(req) {
  const NO_AUTH_URLS = [
    { method: 'POST', url: '/api/v1/user-profile/signin' },
    { method: 'POST', url: '/api/v1/user-profile/super-admin/create' },
  ]
  return NO_AUTH_URLS.filter(u => u.method === req.method && req.originalUrl === u.url).length
}

app.use(function(req, res, next) {
  next(createError(404))
})

const server = http.createServer(app)
const io = require('socket.io').listen(server)
server.listen(insecurePort, function() {
  console.log('Listening on http://localhost:' + insecurePort)
})

const socketFile = require('./server/logics/chat.js')(io)

app.use(function(err, req, res, next) {
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
  res.locals.message = err.message
})

module.exports = app
