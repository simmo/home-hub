const express = require('express')
const router = express.Router() // eslint-disable-line new-cap
const axios = require('axios')

router.get('/:location', (req, res, next) => {
    const GOOGLE_GEOCODE_URL = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${req.params.location}&sensor=true`

    console.log(GOOGLE_GEOCODE_URL)

    axios.get(GOOGLE_GEOCODE_URL)
        .then(response => {
            response.results && response.results[0]
            res.status(response.status).json(response.results)
        })
        .catch(response => {
            if (response) {
                next(response)
            }
        })
})

module.exports = router
