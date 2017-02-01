import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from 'utilities/store'
import { openModal, closeModal } from 'modules/app'
import Modal from 'components/modal'

class ModalContainer extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        app: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)
        this.listenToKeyUp = this.listenToKeyUp.bind(this)
    }

    listenToKeyUp(event) {
        event.which === 27 && this.props.actions.closeModal()
    }

    componentWillMount() {
        window.addEventListener('keyup', this.listenToKeyUp)
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.listenToKeyUp)
    }

    render() {
        return <Modal {...this.props.app.modal} />
    }
}

export default connect(mapStateToProps(['app']), mapDispatchToProps({ openModal, closeModal }))(ModalContainer)
