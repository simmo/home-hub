import React, { PropTypes } from 'react'
import classnames from 'classnames'
import RangeInput from 'components/range-input'

import 'styles/components/light'

const Light = ({ name, brightness, on, reachable, handleToggleChange, handleBrightnessChange }) =>
    <article className="light">
        <div className="light__primary">
            <p className={classnames('light__name', { 'light__name--disabled': !reachable || !on })}>{name}</p>
            <input className="light__state" type="checkbox" defaultChecked={on} disabled={!reachable} onChange={handleToggleChange} />
        </div>
        <div className="light__secondary">
            <RangeInput className="light__brightness" type="range" min="0" max="100" defaultValue={brightness} disabled={!reachable || !on} onInput={handleBrightnessChange} />
        </div>
    </article>

Light.propTypes = {
    name: PropTypes.string.isRequired,
    brightness: PropTypes.number.isRequired,
    on: PropTypes.bool.isRequired,
    reachable: PropTypes.bool.isRequired,
    handleToggleChange: PropTypes.func.isRequired,
    handleBrightnessChange: PropTypes.func.isRequired
}

export default Light
