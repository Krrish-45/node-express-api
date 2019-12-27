const log = require('../logger')
const express = require('express')
const v1APIRouter = express.Router()

const userProfileApiRouter = require('./userProfile')

v1APIRouter.use('/user-profile', userProfileApiRouter)

module.exports = v1APIRouter
