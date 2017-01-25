import React, { PropTypes } from 'react'

import 'styles/components/grid'

const Grid = ({ children }) =>
    <div className="grid">
        {children}
    </div>

Grid.propTypes = {
    children: PropTypes.node
}

export default Grid
