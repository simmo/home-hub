const express = require('express')
const router = express.Router() // eslint-disable-line new-cap
const soap = require('soap')
const moment = require('moment-timezone')

router.get('/', (req, res, next) => {
    if (!req.app.locals.isProduction) {
        res.json(JSON.parse('{"summary":"7 of 10 have issues","total":10,"complications":7,"services":[{"departure":{"name":"Haywards Heath","crs":"HHE","scheduled":"2016-07-01T17:10:00.078Z","estimated":false,"status":"Delayed, formed of 4 coaches"},"arrival":{"name":"London Victoria","crs":"VIC","scheduled":"2016-07-01T17:56:00.078Z","estimated":false,"status":"Delayed"},"length":"4","platform":"4","operatorCode":"SN","callingPoints":[{"locationName":"Gatwick Airport","crs":"GTW","st":"18:22","et":"Delayed","length":"4"},{"locationName":"East Croydon","crs":"ECR","st":"18:39","et":"Delayed","length":"4"},{"locationName":"Clapham Junction","crs":"CLJ","st":"18:49","et":"Delayed","length":"4"},{"locationName":"London Victoria","crs":"VIC","st":"18:56","et":"Delayed","length":"4"}],"isDisrupted":true,"isShortFormed":true,"isDelayed":true,"isCancelled":false},{"departure":{"name":"Haywards Heath","crs":"HHE","scheduled":"2016-07-01T17:14:00.078Z","estimated":false,"status":"Delayed, formed of 4 coaches"},"arrival":{"name":"London Victoria","crs":"VIC","scheduled":"2016-07-01T18:00:00.078Z","estimated":false,"status":"Delayed"},"length":"4","operatorCode":"SN","callingPoints":[{"locationName":"Gatwick Airport","crs":"GTW","st":"18:25","et":"Delayed","length":"4"},{"locationName":"East Croydon","crs":"ECR","st":"18:42","et":"Delayed","length":"4"},{"locationName":"Clapham Junction","crs":"CLJ","st":"18:53","et":"Delayed","length":"4"},{"locationName":"London Victoria","crs":"VIC","st":"19:00","et":"Delayed","length":"4"}],"isDisrupted":true,"isShortFormed":true,"isDelayed":true,"isCancelled":false},{"departure":{"name":"Haywards Heath","crs":"HHE","scheduled":"2016-07-01T17:26:00.068Z","estimated":"2016-07-01T17:28:00.068Z","status":"Delayed by 2 minutes"},"arrival":{"name":"London St Pancras (Intl)","crs":"STP","scheduled":"2016-07-01T18:33:00.068Z","estimated":"2016-07-01T18:33:00.068Z","status":"On time"},"length":"8","platform":"3","operatorCode":"TL","callingPoints":[{"locationName":"Three Bridges","crs":"TBD","st":"18:34","et":"18:36","length":"8"},{"locationName":"Gatwick Airport","crs":"GTW","st":"18:39","et":"On time","length":"8"},{"locationName":"East Croydon","crs":"ECR","st":"18:55","et":"On time","length":"8"},{"locationName":"London Blackfriars","crs":"BFR","st":"19:21","et":"On time","length":"8"},{"locationName":"City Thameslink","crs":"CTK","st":"19:26","et":"On time","length":"8"},{"locationName":"Farringdon Underground","crs":"ZFD","st":"19:29","et":"On time","length":"8"},{"locationName":"London St Pancras (Intl)","crs":"STP","st":"19:33","et":"On time","length":"8"},{"locationName":"West Hampstead Thameslink","crs":"WHP","st":"19:41","et":"On time","length":"8"},{"locationName":"St Albans","crs":"SAC","st":"19:55","et":"On time","length":"8"},{"locationName":"Harpenden","crs":"HPD","st":"20:01","et":"On time","length":"8"},{"locationName":"Luton Airport Parkway","crs":"LTN","st":"20:07","et":"On time","length":"8"},{"locationName":"Luton","crs":"LUT","st":"20:10","et":"On time","length":"8"},{"locationName":"Leagrave","crs":"LEA","st":"20:14","et":"On time","length":"8"},{"locationName":"Harlington","crs":"HLN","st":"20:19","et":"On time","length":"8"},{"locationName":"Flitwick","crs":"FLT","st":"20:23","et":"On time","length":"8"},{"locationName":"Bedford","crs":"BDM","st":"20:35","et":"On time","length":"8"}],"isDisrupted":true,"isShortFormed":false,"isDelayed":true,"isCancelled":false},{"departure":{"name":"Haywards Heath","crs":"HHE","scheduled":"2016-07-01T17:44:00.078Z","estimated":"2016-07-01T17:51:00.078Z","status":"Delayed by 7 minutes"},"arrival":{"name":"London Victoria","crs":"VIC","scheduled":"2016-07-01T18:30:00.079Z","estimated":"2016-07-01T18:33:00.079Z","status":"Delayed by 3 minutes"},"length":"8","platform":"4","operatorCode":"SN","callingPoints":[{"locationName":"Gatwick Airport","crs":"GTW","st":"18:56","et":"19:02","length":"8"},{"locationName":"East Croydon","crs":"ECR","st":"19:12","et":"19:17","length":"8"},{"locationName":"Clapham Junction","crs":"CLJ","st":"19:23","et":"19:26","length":"8"},{"locationName":"London Victoria","crs":"VIC","st":"19:30","et":"19:33","length":"8"}],"isDisrupted":true,"isShortFormed":false,"isDelayed":true,"isCancelled":false},{"departure":{"name":"Haywards Heath","crs":"HHE","scheduled":"2016-07-01T17:56:00.068Z","estimated":"2016-07-01T17:56:00.068Z","status":"On time"},"arrival":{"name":"London St Pancras (Intl)","crs":"STP","scheduled":"2016-07-01T19:03:00.068Z","estimated":"2016-07-01T19:03:00.068Z","status":"On time"},"length":null,"platform":"3","operatorCode":"TL","callingPoints":[{"locationName":"Three Bridges","crs":"TBD","st":"19:04","et":"On time"},{"locationName":"Gatwick Airport","crs":"GTW","st":"19:09","et":"On time"},{"locationName":"East Croydon","crs":"ECR","st":"19:24","et":"On time"},{"locationName":"London Blackfriars","crs":"BFR","st":"19:51","et":"On time"},{"locationName":"City Thameslink","crs":"CTK","st":"19:56","et":"On time"},{"locationName":"Farringdon Underground","crs":"ZFD","st":"19:59","et":"On time"},{"locationName":"London St Pancras (Intl)","crs":"STP","st":"20:03","et":"On time"},{"locationName":"West Hampstead Thameslink","crs":"WHP","st":"20:11","et":"On time"},{"locationName":"St Albans","crs":"SAC","st":"20:25","et":"On time"},{"locationName":"Harpenden","crs":"HPD","st":"20:31","et":"On time"},{"locationName":"Luton Airport Parkway","crs":"LTN","st":"20:37","et":"On time"},{"locationName":"Luton","crs":"LUT","st":"20:40","et":"On time"},{"locationName":"Leagrave","crs":"LEA","st":"20:44","et":"On time"},{"locationName":"Harlington","crs":"HLN","st":"20:49","et":"On time"},{"locationName":"Flitwick","crs":"FLT","st":"20:53","et":"On time"},{"locationName":"Bedford","crs":"BDM","st":"21:05","et":"On time"}],"isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false},{"departure":{"name":"Haywards Heath","crs":"HHE","scheduled":"2016-07-01T18:15:00.079Z","estimated":false,"status":"Cancelled"},"arrival":{"name":"London Victoria","crs":"VIC","scheduled":"2016-07-01T18:59:00.079Z","estimated":false,"status":"Cancelled"},"length":"8","operatorCode":"SN","callingPoints":[{"locationName":"Gatwick Airport","crs":"GTW","st":"19:26","et":"Cancelled","length":"8"},{"locationName":"East Croydon","crs":"ECR","st":"19:41","et":"Cancelled","length":"8"},{"locationName":"Clapham Junction","crs":"CLJ","st":"19:52","et":"Cancelled","length":"8"},{"locationName":"London Victoria","crs":"VIC","st":"19:59","et":"Cancelled","length":"8"}],"isDisrupted":true,"isShortFormed":false,"isDelayed":true,"isCancelled":true},{"departure":{"name":"Haywards Heath","crs":"HHE","scheduled":"2016-07-01T18:26:00.069Z","estimated":"2016-07-01T18:47:00.069Z","status":"Delayed by 21 minutes"},"arrival":{"name":"London St Pancras (Intl)","crs":"STP","scheduled":"2016-07-01T19:33:00.069Z","estimated":"2016-07-01T19:50:00.069Z","status":"Delayed by 17 minutes"},"length":"8","platform":"3","operatorCode":"TL","callingPoints":[{"locationName":"Three Bridges","crs":"TBD","st":"19:34","et":"19:55","length":"8"},{"locationName":"Gatwick Airport","crs":"GTW","st":"19:39","et":"19:59","length":"8"},{"locationName":"East Croydon","crs":"ECR","st":"19:54","et":"20:14","length":"8"},{"locationName":"London Blackfriars","crs":"BFR","st":"20:21","et":"20:41","length":"8"},{"locationName":"City Thameslink","crs":"CTK","st":"20:26","et":"20:44","length":"8"},{"locationName":"Farringdon Underground","crs":"ZFD","st":"20:29","et":"20:46","length":"8"},{"locationName":"London St Pancras (Intl)","crs":"STP","st":"20:33","et":"20:50","length":"8"},{"locationName":"West Hampstead Thameslink","crs":"WHP","st":"20:41","et":"20:58","length":"8"},{"locationName":"St Albans","crs":"SAC","st":"20:55","et":"21:11","length":"8"},{"locationName":"Harpenden","crs":"HPD","st":"21:01","et":"21:17","length":"8"},{"locationName":"Luton Airport Parkway","crs":"LTN","st":"21:07","et":"21:23","length":"8"},{"locationName":"Luton","crs":"LUT","st":"21:10","et":"21:25","length":"8"},{"locationName":"Leagrave","crs":"LEA","st":"21:14","et":"21:29","length":"8"},{"locationName":"Harlington","crs":"HLN","st":"21:19","et":"21:34","length":"8"},{"locationName":"Flitwick","crs":"FLT","st":"21:23","et":"21:38","length":"8"},{"locationName":"Bedford","crs":"BDM","st":"21:35","et":"21:48","length":"8"}],"isDisrupted":true,"isShortFormed":false,"isDelayed":true,"isCancelled":false},{"departure":{"name":"Haywards Heath","crs":"HHE","scheduled":"2016-07-01T18:44:00.079Z","estimated":"2016-07-01T18:44:00.079Z","status":"On time"},"arrival":{"name":"London Victoria","crs":"VIC","scheduled":"2016-07-01T19:28:00.079Z","estimated":"2016-07-01T19:28:00.079Z","status":"On time"},"length":null,"platform":"4","operatorCode":"SN","callingPoints":[{"locationName":"Gatwick Airport","crs":"GTW","st":"19:55","et":"On time"},{"locationName":"East Croydon","crs":"ECR","st":"20:11","et":"On time"},{"locationName":"Clapham Junction","crs":"CLJ","st":"20:20","et":"On time"},{"locationName":"London Victoria","crs":"VIC","st":"20:28","et":"On time"}],"isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false},{"departure":{"name":"Haywards Heath","crs":"HHE","scheduled":"2016-07-01T18:54:00.070Z","estimated":"2016-07-01T18:54:00.070Z","status":"On time"},"arrival":{"name":"London St Pancras (Intl)","crs":"STP","scheduled":"2016-07-01T20:03:00.070Z","estimated":"2016-07-01T20:03:00.070Z","status":"On time"},"length":"8","platform":"3","operatorCode":"TL","callingPoints":[{"locationName":"Balcombe","crs":"BAB","st":"19:59","et":"On time","length":"8"},{"locationName":"Three Bridges","crs":"TBD","st":"20:05","et":"On time","length":"8"},{"locationName":"Gatwick Airport","crs":"GTW","st":"20:09","et":"On time","length":"8"},{"locationName":"East Croydon","crs":"ECR","st":"20:25","et":"On time","length":"8"},{"locationName":"London Blackfriars","crs":"BFR","st":"20:51","et":"On time","length":"8"},{"locationName":"City Thameslink","crs":"CTK","st":"20:56","et":"On time","length":"8"},{"locationName":"Farringdon Underground","crs":"ZFD","st":"20:59","et":"On time","length":"8"},{"locationName":"London St Pancras (Intl)","crs":"STP","st":"21:03","et":"On time","length":"8"},{"locationName":"West Hampstead Thameslink","crs":"WHP","st":"21:11","et":"On time","length":"8"},{"locationName":"St Albans","crs":"SAC","st":"21:25","et":"On time","length":"8"},{"locationName":"Harpenden","crs":"HPD","st":"21:31","et":"On time","length":"8"},{"locationName":"Luton Airport Parkway","crs":"LTN","st":"21:37","et":"On time","length":"8"},{"locationName":"Luton","crs":"LUT","st":"21:40","et":"On time","length":"8"},{"locationName":"Leagrave","crs":"LEA","st":"21:44","et":"On time","length":"8"},{"locationName":"Harlington","crs":"HLN","st":"21:49","et":"On time","length":"8"},{"locationName":"Flitwick","crs":"FLT","st":"21:53","et":"On time","length":"8"},{"locationName":"Bedford","crs":"BDM","st":"22:05","et":"On time","length":"8"}],"isDisrupted":false,"isShortFormed":false,"isDelayed":false,"isCancelled":false},{"departure":{"name":"Haywards Heath","crs":"HHE","scheduled":"2016-07-01T19:14:00.079Z","estimated":"2016-07-01T19:19:00.079Z","status":"Delayed by 5 minutes"},"arrival":{"name":"London Victoria","crs":"VIC","scheduled":"2016-07-01T19:58:00.079Z","estimated":"2016-07-01T20:00:00.079Z","status":"Delayed by 2 minutes"},"length":"12","platform":"4","operatorCode":"SN","callingPoints":[{"locationName":"Gatwick Airport","crs":"GTW","st":"20:25","et":"20:29","length":"12"},{"locationName":"East Croydon","crs":"ECR","st":"20:41","et":"20:44","length":"12"},{"locationName":"Clapham Junction","crs":"CLJ","st":"20:50","et":"20:53","length":"12"},{"locationName":"London Victoria","crs":"VIC","st":"20:58","et":"21:00","length":"12"}],"isDisrupted":true,"isShortFormed":false,"isDelayed":true,"isCancelled":false}]}'))
    } else {
        const wsdl = 'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/wsdl.aspx?ver=2016-02-16'

        const trainTimeToMoment = (trainTime) => {
            // Break train time into hours and minutes
            const trainMoment = moment.tz('Europe/London')
            let timeSplit = trainTime.split(':')

            // If we have hours and minutes
            if (timeSplit.length === 2) {
                timeSplit = timeSplit.map(segment => parseInt(segment, 10))
                trainMoment.hour(timeSplit[0]).minutes(timeSplit[1]).seconds(0)

                return trainMoment
            } else {
                // This isn't a time
                return false
            }
        }

        const processCallingPoint = (name, crs, scheduled, estimated = null) => {
            let callingPoint = {
                name,
                crs,
                isDelayed: false,
                scheduled: trainTimeToMoment(scheduled),
                estimated,
                status: estimated
            }

            if (callingPoint.estimated === 'On time') {
                // If on time then use same time as scheduled
                callingPoint.estimated = callingPoint.scheduled
            } else {
                // Try and convert the etd to a moment
                callingPoint.estimated = trainTimeToMoment(callingPoint.estimated)

                // If we have an estimated time moment, update status
                if (callingPoint.estimated) {
                    callingPoint.status = `Delayed by ${callingPoint.estimated.from(callingPoint.scheduled, true)}`
                }
            }

            callingPoint.isDelayed = callingPoint.estimated && !callingPoint.scheduled.isSame(callingPoint.estimated)

            return callingPoint
        }

        soap.createClient(wsdl, (err, client) => {
            if (err) {
                return next(err)
            }

            client.addSoapHeader({'AccessToken': { 'TokenValue': req.app.locals.nationalRail.apiKey }})

            const departureBoard = crs => new Promise((resolve, reject) => {
                client.GetDepBoardWithDetails({ // eslint-disable-line new-cap
                    numRows: 10,
                    crs: 'HHE',
                    filterCrs: crs,
                    filterType: 'to'
                }, (err, result) => {
                    if (err) {
                        return reject(err)
                    }

                    var services = []

                    if (result && result.GetStationBoardResult && result.GetStationBoardResult.trainServices && result.GetStationBoardResult.trainServices.service.length > 0) {
                        services = result.GetStationBoardResult.trainServices.service.map(service => {
                            let { subsequentCallingPoints: { callingPointList: [ { callingPoint: callingPoints } ] } } = service
                            let [destination] = callingPoints.filter(station => station.crs.toLowerCase() === crs.toLowerCase())
                            let departure = processCallingPoint(result.GetStationBoardResult.locationName, result.GetStationBoardResult.crs, service.std, service.etd)
                            let arrival = processCallingPoint(destination.locationName, destination.crs, destination.st, destination.et)
                            let length = service.length || null
                            let isShortFormed = length && length < 8 || false
                            let isCancelled = service.isCancelled || false

                            if (isShortFormed) {
                                departure.status += `, formed of ${length} coaches`
                            }

                            let isDelayed = departure.isDelayed || arrival.isDelayed

                            return {
                                departure,
                                arrival,
                                length,
                                platform: service.platform,
                                operatorCode: service.operatorCode,
                                callingPoints,
                                isDisrupted: isShortFormed || isDelayed || isCancelled,
                                isShortFormed,
                                isDelayed,
                                isCancelled
                            }
                        })
                    }

                    resolve(services)
                })
            })

            Promise.all([
                departureBoard('VIC'),
                departureBoard('STP')
            ]).then(results => {
                results = results.reduce((a, b) => a.concat(b), []).sort((a, b) => {
                    if (a.departure.scheduled < b.departure.scheduled) {
                        return -1
                    }

                    return a.departure.scheduled > b.departure.scheduled ? 1 : 0
                })

                var response = {
                    summary: '',
                    total: results.length,
                    complications: results.filter(service => service.isDisrupted).length,
                    services: results
                }

                if (response.complications > 0) {
                    response.summary = `${response.complications} of ${response.total} have issues`
                } else {
                    response.summary = 'All services are running'
                }

                res.json(response)
            }).catch(err => next(err))
        })
    }
})

module.exports = router
