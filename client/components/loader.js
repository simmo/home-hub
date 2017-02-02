import React, { PropTypes } from 'react'
import classnames from 'classnames'

import 'styles/components/loader'

const Loader = ({ inline, message }) => {
    const classes = classnames('loader', { 'loader--inline': inline })

    return (
        <div className={classes}>
            <p className="loader__message">{message}</p>
        </div>
    )
}

Loader.defaultProps = {
    inline: false,
    message: 'Loading...'
}

Loader.propTypes = {
    inline: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired
}

export default Loader
