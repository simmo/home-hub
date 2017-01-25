const express = require('express')
const { HueApi } = require('node-hue-api')
const router = express.Router() // eslint-disable-line new-cap

router.use((req, res, next) => {
    res.locals.hue = new HueApi(req.app.locals.hue.host, req.app.locals.hue.apiKey)

    next()
})

router.get('/', (req, res, next) => {
    const formatLightsdata = (rawData) => {
        let keyedObjectToArray = (object, propertyName = 'id') => {
            return Object.keys(object).map(key => {
                let value = object[key]
                value[propertyName] = key
                return value
            })
        }

        return {
            rooms: keyedObjectToArray(rawData.groups, 'roomId'),
            lights: keyedObjectToArray(rawData.lights, 'lightId')
        }
    }

    if (!req.app.locals.isProduction) {
        const mockedData = require('../../data/seed/lights.json')
        const data = formatLightsdata(mockedData)

        res.json(data)
    } else {
        res.locals.hue.getFullState()
        .then(state => res.json(formatLightsdata(state)))
        .fail(error => next(error))
        .done()
    }
})

router.put('/lights/:lightId/state', (req, res, next) => {
    if (!req.app.locals.isProduction) {
        res.json({ lightId: req.params.lightId, state: req.body.data })
    } else {
        res.locals.hue.setLightState(req.params.lightId, req.body.data)
        .then(() => {
            res.locals.hue.lightStatus(req.params.lightId)
            .then(data => res.json({ lightId: req.params.lightId, state: data.state }))
            .fail(error => next(error))
            .done()
        })
        .fail(error => next(error))
        .done()
    }
})

module.exports = router
