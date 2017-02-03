import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'utilities/store/helpers'
import Dashboard from 'components/dashboard'
import { fetchCoords } from 'modules/app'
import { load as loadWeather } from 'modules/weather'
import moment from 'moment'

class DashboardContainer extends Component {
    refreshTimers = {}

    refreshTime() {
        this.setState({
            ...this.state,
            timeMoment: moment()
        })

        this.refreshTimers.time = setTimeout(this.refreshTime.bind(this), 1000)
    }

    refreshWeather() {
        this.props.actions.fetchCoords().then(() => {
            if (!this.props.app.location.data) {
                return
            }

            const { latitude, longitude } = this.props.app.location.data

            this.props.actions.loadWeather(latitude, longitude)
        })

        this.refreshTimers.weather = setTimeout(this.refreshWeather.bind(this), 1000 * 60 * 5)
    }

    componentWillMount() {
        this.refreshTime()
        this.refreshWeather()
    }

    componentWillUnmount() {
        Object.keys(this.refreshTimers).forEach(timer => clearTimeout(this.refreshTimers[timer]))
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState.timeMoment.isAfter(this.state.timeMoment, 'minute')
    }

    render() {
        return <Dashboard time={this.state.timeMoment} weather={{...this.props.weather, isFetching: this.props.app.location.isFetching || this.props.weather.isFetching}} />
    }
}

DashboardContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    app: PropTypes.object.isRequired,
    weather: PropTypes.object.isRequired
}

export default connect(mapStateToProps(['app', 'weather']), mapDispatchToProps({ fetchCoords, loadWeather }))(DashboardContainer)
