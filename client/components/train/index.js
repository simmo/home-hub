import React, { PropTypes } from 'react'
import classes from 'classnames'
import Icon from 'components/icon'
import TrainLocation from './location'

import 'styles/components/train'

const Train = ({ arrival, departure, isCancelled, isDelayed, platform }) =>
    <article className={classes('train', { 'train--cancelled': isCancelled, 'train--delayed': isDelayed })}>
        <TrainLocation isCancelled={isCancelled} location={departure} platform={platform || 'TBC'} />
        <div className="train__separator">
            <Icon name="forward" />
        </div>
        <TrainLocation isCancelled={isCancelled} location={arrival} />
    </article>

Train.propTypes = {
    arrival: PropTypes.object.isRequired,
    departure: PropTypes.object.isRequired,
    isCancelled: PropTypes.bool.isRequired,
    isDelayed: PropTypes.bool.isRequired,
    platform: PropTypes.string
}

export default Train
