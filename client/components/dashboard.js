import React, { PropTypes } from 'react'
import Module from 'components/module'
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
            <div className="dashboard__module">
                <Module icon="wifi" title="WiFi" url="/wifi" />
            </div>
            <div className="dashboard__module">
                <Module icon="light-bulb" title="Lights" url="/lights" />
            </div>
            <div className="dashboard__module">
                <Module icon="train" title="Trains" url="/trains" />
            </div>
            <div className="dashboard__module">
                <Module icon="smoke-co" title="Smoke & CO" url="/smoke-co" />
            </div>
        </div>
    </div>

Dashboard.propTypes = {
    time: PropTypes.object.isRequired
}

export default Dashboard
