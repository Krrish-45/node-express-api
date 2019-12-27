const chalk = require('chalk')
const Mongoose = require('mongoose')
const { MONGO_DB_CONFIG } = require('../../config')
const log = require('../../logger')

Mongoose.Promise = global.Promise

const dbURI = MONGO_DB_CONFIG.db_uri

Mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
})
  .then(_ => {
    console.log(chalk.greenBright('Mongo connected to:', dbURI))
  })
  .catch(err => {
    console.log(chalk.redBright('Mongo connection failed:'), err)
  })

Mongoose.connection.on('error', function(err) {
  log.error(chalk.red('Mongo connection failed:'), err)
  throw err
})

module.exports = {
  Mongoose,
  models: {
    userProfile: require('./schemas/userProfile.js'),
  },
  dbURI,
}
