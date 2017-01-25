import React, { PropTypes } from 'react'

// import 'styles/components/unlock'

const Unlock = ({ handleUnlock }) =>
    <button className="unlock" type="button" onClick={handleUnlock}>
        <span className="unlock__text">Unlock</span>
    </button>

Unlock.propTypes = {
    handleUnlock: PropTypes.func.isRequired
}

export default Unlock
