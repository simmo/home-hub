import React, { PropTypes } from 'react'
import moment from 'moment'
import classnames from 'classnames'

const TrainLocation = ({ isCancelled, location, platform }) =>
    <div className={classnames('train__location', { 'train__location--delayed': location.isDelayed })}>
        <h3 className="train__time">{moment(location.scheduled).format('HH:mm')}</h3>
        <p className="train__station">{location.name}</p>
        <div className="train__data">
            <p className="train__status">{location.status}</p>
        </div>
        {!isCancelled && platform && <div className="train__data">
            <p className="train__platform">{platform}</p>
        </div>}
    </div>

TrainLocation.propTypes = {
    isCancelled: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    platform: PropTypes.string
}

export default TrainLocation
