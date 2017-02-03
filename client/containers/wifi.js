import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from 'utilities/store/helpers'
import Loading from 'components/loading'
import Error from 'components/error'
import { load } from 'modules/wifi'
import { Header, Group, Stat } from 'components/typography'
import Grid from 'components/grid'
import Screen from 'components/screen'

class WifiContainer extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        wifi: PropTypes.object.isRequired
    }

    componentWillMount() {
        this.props.actions.load()
    }

    render() {
        const { wifi } = this.props
        let content = null

        if (wifi.isFetching) {
            content = <Loading message="Fetching WiFi data..." />
        } else {
            if (wifi.data) {
                const { attenuation, speed, noise, uptime } = wifi.data

                content = [
                    <Group key="uptime">
                        <Header>Uptime</Header>
                        <p>The connection has been active for {uptime.connection} with the router running for {uptime.router}.</p>
                    </Group>,
                    <Group key="speed">
                        <Header>Speed</Header>
                        <Grid>
                            <Stat label="Down &#8595;" value={speed.downstream} unit="mbps" />
                            <Stat label="Up &#8593;" value={speed.upstream} unit="mbps" />
                        </Grid>
                    </Group>,
                    <Group key="noise">
                        <Header>Noise margin</Header>
                        <Grid>
                            <Stat label="Down &#8595;" value={noise.downstream} unit="dB" />
                            <Stat label="Up &#8593;" value={noise.upstream} unit="dB" />
                        </Grid>
                    </Group>,
                    <Group key="attenuation">
                        <Header>Attenuation</Header>
                        <Grid>
                            <Stat label="Down &#8595;" value={attenuation.downstream} unit="dB" />
                            <Stat label="Up &#8593;" value={attenuation.upstream} unit="dB" />
                        </Grid>
                    </Group>
                ]
            } else {
                content = <Error message="Could not load WiFi data." details={wifi.error} cta={this.props.actions.load} />
            }
        }

        return <Screen backUrl="/" className="wifi" title="WiFi">{content}</Screen>
    }
}

export default connect(mapStateToProps(['wifi']), mapDispatchToProps({ load }))(WifiContainer)
