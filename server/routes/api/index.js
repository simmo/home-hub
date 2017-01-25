const express = require('express')
const hue = require('./hue')
const location = require('./location')
const nest = require('./nest')
const trains = require('./trains')
const weather = require('./weather')
const wifi = require('./wifi')
const router = express.Router() // eslint-disable-line new-cap

router.use('/hue', hue)
router.use('/location', location)
router.use('/nest', nest)
router.use('/trains', trains)
router.use('/weather', weather)
router.use('/wifi', wifi)

router.use((req, res) => {
    res.status(404).json({
        error: true
    })
})

module.exports = router
