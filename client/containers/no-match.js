import React, { PropTypes } from 'react'
import Error from 'components/error'

const NoMatchContainer = ({ location }) =>
    <Error message="Sorry, that page doesn't exist" details={{ code: 404, message: `${location.pathname} was not found` }} cta="/" ctaText="Back to dashboard" />

NoMatchContainer.propTypes = {
    location: PropTypes.object.isRequired
}

export default NoMatchContainer
