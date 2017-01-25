import React from 'react'
import momentPropType from 'utilities/prop-types/moment'

import 'styles/components/time'

const Time = ({ moment }) =>
    <div className="time">
        <div className="time__clock">{moment.format('HH:mm')}</div>
        <div className="time__date">{moment.format('dddd, D MMMM YYYY')}</div>
    </div>

Time.propTypes = {
    moment: momentPropType
}

export default Time
