import React, { PropTypes } from 'react'

// import 'styles/components/scroller'

const Scroller = ({ children }) =>
    <div className="scroller">
        <div className="scroller__inner">
            {children.map((children, index) => <div key={index} className="scroller__item">{children}</div>)}
        </div>
    </div>

Scroller.propTypes = {
    children: PropTypes.array
}

export default Scroller
