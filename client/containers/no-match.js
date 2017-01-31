import React from 'react'
import Error from 'components/error'

const NoMatchContainer = () =>
    <Error message="Sorry, that page doesn't exist" details={{ code: 404, message: `${location.pathname} was not found` }} cta="/" ctaText="Back to dashboard" />

export default NoMatchContainer
