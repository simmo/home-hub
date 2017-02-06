import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import throttle from 'lodash.throttle'
import { mapDispatchToProps } from 'utilities/store/helpers'
import Light from 'components/light'
import { update } from 'modules/hue'

const maxBrightness = 254
const brightnessPercentage = brightness => Math.round((brightness / maxBrightness) * 100)

class LightContainer extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        lightId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        state: PropTypes.object.isRequired
    }

    update = throttle(state => this.props.actions.update(`lights/${this.props.lightId}/state`, state), 500)

    handleBrightnessChange(event) {
        this.update({
            bri: Math.round((event.target.value / 100) * maxBrightness)
        })
    }

    handleToggleChange(event) {
        this.update({
            on: event.target.checked
        })
    }

    render() {
        const { name, state } = this.props

        return (
            <Light
                brightness={brightnessPercentage(state.bri)}
                handleBrightnessChange={this.handleBrightnessChange.bind(this)}
                handleToggleChange={this.handleToggleChange.bind(this)}
                name={name}
                on={state.on}
                reachable={state.reachable} />
        )
    }
}

export default connect(null, mapDispatchToProps({ update }))(LightContainer)
