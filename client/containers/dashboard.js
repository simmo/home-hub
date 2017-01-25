import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from 'utilities/store'
import Dashboard from 'components/dashboard'
import moment from 'moment'

class DashboardContainer extends Component {
    refreshTime() {
        this.setState({
            ...this.state,
            timeMoment: moment()
        })

        this.refreshTimer = setTimeout(this.refreshTime.bind(this), 1000)
    }

    componentWillMount() {
        this.refreshTime()
    }

    componentWillUnmount() {
        clearTimeout(this.refreshTimer)
    }

    render() {
        return <Dashboard time={this.state.timeMoment} />
    }
}

DashboardContainer.propTypes = {}

export default connect(mapStateToProps([]))(DashboardContainer)
