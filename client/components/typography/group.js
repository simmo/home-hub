import React, { PropTypes } from 'react'

import 'styles/components/group'

const Group = ({ children }) =>
    <section className="group">{children}</section>

Group.propTypes = {
    children: PropTypes.node.isRequired
}

export default Group
