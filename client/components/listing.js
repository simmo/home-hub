import React, { PropTypes } from 'react'

import 'styles/components/listing'

const Listing = ({ children }) =>
    <div className="listing">
        {React.Children.map(children, (child, index) =>
            <div className="listing__item" key={index}>{child}</div>
        )}
    </div>

Listing.propTypes = {
    children: PropTypes.any
}

export default Listing
