import React, { PropTypes } from 'react'
import { Motion, spring, presets } from 'react-motion'
import { Link } from 'react-router'

import 'styles/components/error'

const Error = ({ details, cta, ctaText, message }) =>
    <Motion defaultStyle={{opacity: 0, zoom: .5}} style={{ opacity: spring(1, presets.wobbly), zoom: spring(1, presets.wobbly) }}>
        {value =>
            <div className="error" style={{ opacity: value.opacity, transform: `scale(${value.zoom})` }}>
                <h1 className="error__title">Oops!</h1>
                <p className="error__message">{message}</p>
                {details && <p className="error__details">{details.code}, {details.message}</p>}
                {cta && typeof cta === 'function' && <button className="error__retry" onClick={cta}>{ctaText}</button>}
                {cta && typeof cta === 'string' && <Link className="error__retry" to={cta}>{ctaText}</Link>}
            </div>
        }
    </Motion>

Error.propTypes = {
    cta: PropTypes.any,
    ctaText: PropTypes.string.isRequired,
    details: PropTypes.object,
    message: PropTypes.string.isRequired
}

Error.defaultProps = {
    ctaText: 'Try again?'
}

export default Error
