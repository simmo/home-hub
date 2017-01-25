import React, { PropTypes } from 'react'
import { decimalToPercent } from 'utilities/format'

// import 'styles/components/time-entry'

const TimeEntry = ({ time, temperature, apparentTemperature, precipType, precipProbability }) =>
    <article className="time-entry">
        <h1 className="time-entry__time">{time}</h1>
        <p>{temperature}&deg;</p>
        <p>{apparentTemperature}&deg;</p>
        <p>{precipType || 'rain'}<br />{decimalToPercent(precipProbability)}%</p>
    </article>

TimeEntry.propTypes = {
    apparentTemperature: PropTypes.number.isRequired,
    temperature: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    precipType: PropTypes.string,
    precipProbability: PropTypes.number.isRequired
}

export default TimeEntry
