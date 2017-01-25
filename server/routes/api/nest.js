const express = require('express')
const router = express.Router() // eslint-disable-line new-cap
const axios = require('axios')

router.get('/', (req, res, next) => {
    const formatNestData = (data) => {
        const { devices } = data

        return devices
    }

    if (!req.app.locals.isProduction) {
        const mockedData = require('../../data/seed/nest')
        const data = formatNestData(mockedData)

        res.json(data)
    } else {
        const accessToken = ''
        const options = {
            Authorization: `Bearer ${accessToken}`,
            responseType: 'text',
            timeout: 5000
        }

        axios.get('https://developer-api.nest.com', options)
            .then(response => {
                const data = formatNestData(response.data)

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
