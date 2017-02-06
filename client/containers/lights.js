import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from 'utilities/store/helpers'
import Loading from 'components/loading'
import Error from 'components/error'
import Light from 'containers/light'
import { load } from 'modules/hue'
import { Header, Group } from 'components/typography'
import Screen from 'components/screen'

class LightsContainer extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        hue: PropTypes.object.isRequired
    }

    componentWillMount() {
        this.props.actions.load()
    }

    render() {
        const { hue } = this.props
        let content = null

        if (hue.isFetching) {
            content = <Loading message="Finding lights..." />
        } else {
            if (hue.data) {
                content = hue.data.rooms.map((room, roomIndex) =>
                    <Group key={roomIndex}>
                        <Header>{room.name}</Header>
                        {hue.data.lights.filter(light => room.lights.includes(light.lightId)).map((light, lightIndex) =>
                            <Light key={lightIndex} lightId={light.lightId} name={light.name} state={light.state} />
                        )}
                    </Group>
                )
            } else {
                content = <Error message="Could not find lights." details={hue.error} cta={this.props.actions.load} />
            }
        }

        return <Screen backUrl="/" className="hue" title="Lights">{content}</Screen>
    }
}

export default connect(mapStateToProps(['hue']), mapDispatchToProps({ load }))(LightsContainer)
