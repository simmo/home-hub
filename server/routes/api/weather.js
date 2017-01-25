const express = require('express')
const router = express.Router() // eslint-disable-line new-cap
const axios = require('axios')
const querystring = require('querystring')

router.get('/:location', (req, res, next) => {
    const formatWeatherData = (data) => {
        return data
    }

    if (!req.app.locals.isProduction) {
        const mockedData = require('../../data/seed/weather')
        const data = formatWeatherData(mockedData)

        res.json(data)
    } else {
        axios.get(`https://api.forecast.io/forecast/${req.app.locals.forecast.apiKey}/${req.params.location}?${querystring.stringify(req.query)}`)
            .then(response => {
                const data = formatWeatherData(response.data)

                res.status(response.status).json(data)
            })
            .catch(response => {
                if (response) {
                    next(response)
                }
            })
    }
})

module.exports = router
