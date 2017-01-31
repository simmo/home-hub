import React, { PropTypes } from 'react'
import Modules from 'components/modules'
import Time from 'components/time'

import 'styles/components/dashboard'

const Dashboard = ({ time }) =>
    <div className="dashboard">
        <div className="dashboard__home">
            <div className="dashboard__time">
                <Time moment={time} />
            </div>
            <div className="dashboard__weather">
                Weather coming soon...
            </div>
        </div>
        <div className="dashboard__modules">
            <Modules />
        </div>
    </div>

Dashboard.propTypes = {
    time: PropTypes.object.isRequired
}

export default Dashboard
