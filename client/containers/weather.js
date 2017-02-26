import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from 'utilities/store/helpers'
import { load } from 'modules/weather'
import { fetchCoords } from 'modules/app'
import Loading from 'components/loading'
import Error from 'components/error'
import Screen from 'components/screen'
import moment from 'moment'
import { Header, Group } from 'components/typography'
import TimeEntry from 'components/weather/time-entry'
import Scroller from 'components/scroller'

class WeatherContainer extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        app: PropTypes.object.isRequired,
        weather: PropTypes.object.isRequired
    }

    refreshTimers = {}

    refreshData() {
        this.props.actions.fetchCoords().then(() => {
            if (!this.props.app.location.data) {
                return
            }

            const { latitude, longitude } = this.props.app.location.data

            this.props.actions.load(latitude, longitude)
        })

        this.refreshTimers.load = setTimeout(this.refreshData.bind(this), 1000)
    }

    componentWillMount() {
        this.refreshData()
    }

    componentWillUnmount() {
        Object.keys(this.refreshTimers).forEach(timer => clearTimeout(this.refreshTimers[timer]))
    }

    render() {
        const { app, weather } = this.props
        let content = null

        if (app.location.isFetching) {
            content = <Loading message="Fetching location..." />
        } else if (weather.isFetching) {
            content = <Loading message="Fetching weather..." />
        } else if (app.location.error) {
            content = <Error message="Location could not be found." details={app.location.error} />
        } else if (weather.error) {
            content = <Error message="Weather could not be loaded." details={weather.error} cta={this.fetchData.bind(this)} />
        } else {
            if (weather.data) {
                const today = moment().utc()
                const { currently, hourly, daily } = weather.data

                content = (
                    <div>
                        <Group>
                            <Header>Today</Header>
                            <p>Summary: {currently.summary}</p>
                            <p>Temperature: {Math.round(currently.temperature)}&deg;</p>
                            <p>Feels like: {Math.round(currently.apparentTemperature)}&deg;</p>
                        </Group>

                        <Group>
                            <Header>Next 24 hrs</Header>
                            <Scroller>
                                {hourly.data.slice(0, 24).map((hour, hourIndex) => {
                                    const time = moment.unix(hour.time)
                                    return <TimeEntry
                                        key={hourIndex}
                                        time={time.isSame(today, 'hour') ? 'Now' : time.format('h')}
                                        temperature={Math.round(hour.temperature)}
                                        apparentTemperature={Math.round(hour.apparentTemperature)}
                                        precipType={hour.precipType}
                                        precipProbability={hour.precipProbability} />
                                })}
                            </Scroller>
                        </Group>

                        <Group>
                            <Header>Next 7 days</Header>
                            <p>{daily.summary}</p>
                            {daily.data.filter(day => !moment.unix(day.time).utc().isSame(today, 'day')).map((day, dayIndex) =>
                                <article key={dayIndex} className="list-item">
                                    <div className="list-item__primary">
                                        <h3 className="list-item__title">{moment.unix(day.time).utc().format('dddd')}</h3>
                                        <p className="list-item__subtle">{day.summary}</p>
                                    </div>
                                    <p className="list-item__secondary">
                                        {Math.round(day.temperatureMin)} / {Math.round(day.temperatureMax)}&deg;
                                    </p>
                                </article>
                            )}
                        </Group>
                    </div>
                )
            }
        }

        return <Screen backUrl="/" className="weather" title="Weather">{content}</Screen>
    }
}

export default connect(mapStateToProps(['app', 'weather']), mapDispatchToProps({ load, fetchCoords }))(WeatherContainer)
