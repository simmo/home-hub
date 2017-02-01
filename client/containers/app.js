import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { mapStateToProps, mapDispatchToProps } from 'utilities/store'
import { calculateTimeOfDay, fetchCoords, lock, unlock, openModal, closeModal } from 'modules/app'
import DashboardContainer from 'containers/dashboard'
import LightsContainer from 'containers/lights'
import TrainsContainer from 'containers/trains'
import WifiContainer from 'containers/wifi'
import NoMatchContainer from 'containers/no-match'
import ModalContainer from 'containers/modal'
import Unlock from 'components/unlock'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import 'styles/components/app'

class App extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        app: PropTypes.object.isRequired
    }

    static settings = {
        timeout: 1000 * 60,
        events: ['mousemove', 'keydown', 'wheel', 'DOMMouseScroll', 'mouseWheel', 'mousedown', 'touchstart', 'touchmove', 'MSPointerDown', 'MSPointerMove']
    }

    state = {
        idle: false,
        lastActive: new Date(),
        timer: null,
        pageX: null,
        pageY: null
    }

    componentWillMount() {
        // Add activity listeners
        // App.settings.events.forEach(event => document.addEventListener(event, this._handleEvent.bind(this)))

        this.timeOfDay()
    }

    componentDidMount() {
        setTimeout(this.promptFullscreen.bind(this), 2000)
    }

    promptFullscreen() {
        if (!__DEV__ && !document.fullscreenElement) {
            this.props.actions.openModal({
                confirmCta: 'Yes, supersize me',
                message: 'Would you like to run in fullscreen mode?',
                handleCancel: this.props.actions.closeModal.bind(this),
                handleConfirm: () => this.root.requestFullscreen() && this.props.actions.closeModal()
            })
        }
    }

    timeOfDay() {
        this.props.actions.fetchCoords().then(() => {
            if (!this.props.app.location.data) {
                return
            }

            const { latitude, longitude } = this.props.app.location.data

            this.props.actions.calculateTimeOfDay(latitude, longitude)
        })
    }

    componentWillUnmount() {
        // Remove activity listeners
        App.settings.events.forEach(event => document.removeEventListener(event, this._handleEvent.bind(this)))

        clearTimeout(this.timeout)
        clearTimeout(this.state.timer)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.app !== nextProps.app) {

            clearTimeout(this.timeout)

            // Check time of day every 5 minutes
            this.timeout = setTimeout(this.timeOfDay.bind(this), 1000 * 60 * 5)
        }
    }

    render() {
        const { actions, app } = this.props
        const classes = classnames('app', {
            'app--standalone': window.navigator.standalone,
            'app--twilight': app.dayPeriod.isTwilight,
            'app--day': app.dayPeriod.isDay,
            'app--night': app.dayPeriod.isNight,
            'app--locked': app.locked
        })

        return (
            <Router>
                <div className={classes} ref={(node) => this.root = node}>
                    <div className="app__background" />
                    {app.locked && <Unlock handleUnlock={actions.unlock} />}
                    {!app.locked && <div className={classnames('app__screen', { 'app__screen--blurred': app.modal })}>
                        <Switch>
                            <Route exact path="/" component={DashboardContainer} />
                            <Route path="/lights" component={LightsContainer} />
                            <Route path="/trains" component={TrainsContainer} />
                            <Route path="/wifi" component={WifiContainer} />
                            <Route component={NoMatchContainer} />
                        </Switch>
                    </div>}
                    {app.modal && <div className="app__modal">
                        <ModalContainer />
                    </div>}
                </div>
            </Router>
        )
    }

    _handleEvent(event) {
        if (event.type === 'mousemove') {
            if (typeof event.pageX === 'undefined' && typeof event.pageY === 'undefined') {
                return
            }

            if (event.pageX === this.state.pageX && event.pageY === this.state.pageY) {
                return
            }

            if (new Date() - this.state.lastActive < 200) {
                return
            }
        }

        if (this.state.timer) {
            clearTimeout(this.state.timer)
        }

        this.setState({
            lastActive: new Date(),
            pageX: event.pageX,
            pageY: event.pageY,
            timer: setTimeout(this.props.actions.lock, App.settings.timeout)
        })
    }
}

export default connect(mapStateToProps(['app']), mapDispatchToProps({ calculateTimeOfDay, fetchCoords, lock, unlock, openModal, closeModal }))(App)
