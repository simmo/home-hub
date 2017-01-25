const express = require('express')
const router = express.Router() // eslint-disable-line new-cap
const axios = require('axios')
const moment = require('moment')
const fs = require('fs')

router.get('/', (req, res, next) => {
    const formatWifiData = (html) => {
        const [, speedDownstream, speedUpstream] = /Connection Speed.*?([\d\.]+).*?([\d\.]+).*?\<\/tr\>/.exec(html)
        const [, lineDownstream, lineUpstream] = /Line Attenuation.*?([\d\.]+).*?([\d\.]+).*?\<\/tr\>/.exec(html)
        const [, noiseDownstream, noiseUpstream] = /Noise Margin.*?([\d\.]+).*?([\d\.]+).*?\<\/tr\>/.exec(html)
        const [, routerUpTimeDuration] = /System Up Time\s?.*\s+(\d+:\d+:\d+)/.exec(html)
        const [, connectionUpTimeDuration] = /WAN.*?(\d+:\d+:\d+).*?\<\/tr\>/.exec(html)

        const routerUpTime = moment.duration(routerUpTimeDuration).humanize()
        const connectionUpTime = moment.duration(connectionUpTimeDuration).humanize()

        return {
            uptime: {
                router: routerUpTime,
                connection: connectionUpTime
            },
            speed: {
                downstream: parseInt(speedDownstream, 10) / 1000,
                upstream: parseInt(speedUpstream, 10) / 1000
            },
            attenuation: {
                downstream: lineDownstream,
                upstream: lineUpstream
            },
            noise: {
                downstream: noiseDownstream,
                upstream: noiseUpstream
            }
        }
    }

    // const rqoptions = {
    //     auth: req.app.locals.wifi.auth,
    //     responseType: 'text',
    //     timeout: 5000
    // }
    //
    // const stats = new Promise(() => {
    //     axios.get(`${req.app.locals.wifi.baseUri}/sky_system.html`, options)
    //         .then(response => {
    //             const data = formatWifiData(response.data)
    //
    //             res.status(response.status).json(data)
    //         })
    //         .catch(response => {
    //             if (response) {
    //                 next(response)
    //             }
    //         })
    // })
    //
    // const devices = new Promise(() => {
    //     axios.get(`${req.app.locals.wifi.baseUri}/sky_attached_devices.html`, rqoptions)
    //         .then(response => {
    //             const data = formatWifiData(response.data)
    //
    //             res.status(response.status).json(data)
    //         })
    //         .catch(response => {
    //             if (response) {
    //                 next(response)
    //             }
    //         })
    // })

    if (!req.app.locals.isProduction) {
        fs.readFile('./server/data/seed/wifi.html', 'utf8', (err, mockedData) => {
            if (err) {
                return console.log(err)
            }

            const data = formatWifiData(mockedData)

            res.json(data)
        })
    } else {
        const options = {
            auth: req.app.locals.wifi.auth,
            responseType: 'text',
            timeout: 5000
        }

        axios.get(`${req.app.locals.wifi.baseUri}/sky_system.html`, options)
            .then(response => {
                const data = formatWifiData(response.data)

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
