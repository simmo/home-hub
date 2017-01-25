import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Icon from 'components/icon'

import 'styles/components/module'

const Module = ({ icon, title, url }) =>
    <Link to={url} className="module">
        <span className="module__icon">
            <Icon name={icon} />
        </span>
        <p className="module__title">{title}</p>
    </Link>

Module.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default Module
