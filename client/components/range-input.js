import React, { Component, PropTypes } from 'react'

export default class RangeInput extends Component {
    static propTypes = {
        onInput: PropTypes.func
    }

    state = {
        progress: '0% 100%'
    }

    handleProgress({ min, max, value, defaultValue }) {
        this.setState({
            ...this.state,
            progress: ((value || defaultValue) - min) * 100 / (max - min) + '% 100%'
        })
    }

    handleInput(e) {
        this.handleProgress(e.target)
        return this.props.onInput && this.props.onInput(e)
    }

    componentWillMount() {
        this.handleProgress(this.props)
    }

    render() {
        return <input {...this.props} style={{ backgroundSize: this.state.progress }} onInput={this.handleInput.bind(this)} />
    }
}
