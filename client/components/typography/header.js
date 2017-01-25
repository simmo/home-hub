import React, { PropTypes } from 'react'

import 'styles/components/header'

const Header = ({ children }) =>
    <h2 className="header">{children}</h2>

Header.propTypes = {
    children: PropTypes.any.isRequired
}

export default Header
