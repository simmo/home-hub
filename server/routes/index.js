const express = require('express')
const router = express.Router() // eslint-disable-line new-cap
const api = require('./api')

router.use('/api', api)

module.exports = router
