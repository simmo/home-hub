import React, { PropTypes } from 'react'

import 'styles/components/stat'

const Stat = ({ label, unit, value }) =>
    <div className="stat">
        <div className="stat__value">
            {value}{unit && <span className="stat__unit"> {unit}</span>}
        </div>
        <div className="stat__label">
            {label}
        </div>

    </div>

Stat.propTypes = {
    label: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
}

export default Stat
