import React, { PropTypes } from 'react'
import { Motion, spring, presets } from 'react-motion'

import 'styles/components/loading'

const Loading = ({ message }) =>
    <Motion defaultStyle={{opacity: 0, zoom: .5}} style={{ opacity: spring(1, presets.wobbly), zoom: spring(1, presets.wobbly) }}>
        {value =>
            <div className="loading" style={{ opacity: value.opacity, transform: `scale(${value.zoom})` }}>
                <p className="loading__message">{message}</p>
            </div>
        }
    </Motion>

Loading.defaultProps = {
    message: 'Loading...'
}

Loading.propTypes = {
    message: PropTypes.string.isRequired
}

export default Loading
