import React, { PropTypes } from 'react'
import Entry from 'components/weather/entry'
import Listing from 'components/listing'
import Modules from 'components/modules'
import Loader from 'components/loader'
import Time from 'components/time'

import 'styles/components/dashboard'

const Dashboard = ({ time, weather }) =>
    <div className="dashboard">
        <div className="dashboard__home">
            <div className="dashboard__time">
                <Time moment={time} />
            </div>
            <div className="dashboard__weather">
                {!weather.data && weather.isFetching && <Loader inline={true} message="Fetching weather" />}
                {weather.data && <Listing>
                    <Entry
                        description={weather.data.currently.summary}
                        heading={weather.data.location}
                        icon={weather.data.currently.icon}
                        stat={`${Math.round(weather.data.currently.temperature)}°`}
                    />
                </Listing>}
            </div>
        </div>
        <div className="dashboard__modules">
            <Modules />
        </div>
    </div>

Dashboard.propTypes = {
    time: PropTypes.object.isRequired,
    weather: PropTypes.object.isRequired
}

export default Dashboard
