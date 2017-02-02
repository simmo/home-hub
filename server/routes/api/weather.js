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
        Promise.all([
            axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${req.params.location}&sensor=true`)
                .then((response, error) => {
                    if (error) {
                        return null
                    }

                    const { data: { results: [ { address_components: address } ] } } = response
                    const locality = address && address.find(item => item.types.includes('locality'))

                    return locality && locality.long_name
                }),
            axios.get(`https://api.forecast.io/forecast/${req.app.locals.forecast.apiKey}/${req.params.location}?${querystring.stringify(req.query)}`)
                .then(response => {
                    const data = formatWeatherData(response.data)
                    return data
                })
                .catch(response => response && next(response))
        ]).then(([ location, weather ]) => res.json(Object.assign({}, weather, { location })))
    }
})

module.exports = router
