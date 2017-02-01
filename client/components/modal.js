import React, { Component, PropTypes } from 'react'
import { Motion, spring, presets } from 'react-motion'

import 'styles/components/modal'

class Modal extends Component {
    static propTypes = {
        handleCancel: PropTypes.func,
        handleConfirm: PropTypes.func.isRequired,
        message: PropTypes.string.isRequired,
        confirmText: PropTypes.string.isRequired,
        cancelText: PropTypes.string.isRequired
    }

    static defaultProps = {
        confirmText: 'Confirm',
        cancelText: 'Cancel'
    }

    componentDidMount() {
        this.confirmButton.focus()
    }

    render() {
        const { cancelText, confirmText, handleCancel, handleConfirm, message} = this.props

        return (
            <Motion defaultStyle={{opacity: 0, zoom: .5}} style={{ opacity: spring(1, presets.wobbly), zoom: spring(1, presets.wobbly) }}>
                {value =>
                    <div className="modal" style={{ opacity: value.opacity, transform: `scale(${value.zoom})` }}>
                        <h2 className="modal__message">{message}</h2>
                        <div className="modal__actions">
                            <button className="modal__button modal__button--confirm" type="button" onClick={handleConfirm} ref={node => this.confirmButton = node}>{confirmText}</button>
                            {handleCancel && <button className="modal__button modal__button--cancel" type="button" onClick={handleCancel}>{cancelText}</button>}
                        </div>
                    </div>
                }
            </Motion>
        )
    }
}

export default Modal
