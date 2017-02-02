import React, { PropTypes } from 'react'
import Icon, { IconsAvailable } from 'components/icon'

import 'styles/components/entry'

const Entry = ({ description, heading, icon, stat }) =>
    <article className="entry">
        <header className="entry__text">
            <h2 className="entry__heading">{heading}</h2>
            <p className="entry__description">{description}</p>
        </header>
        <div className="entry__icon">
            <Icon name={icon} />
        </div>
        <div className="entry__stat">
            {stat}
        </div>
    </article>

Entry.propTypes = {
    description: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    icon: PropTypes.oneOf(IconsAvailable),
    stat: PropTypes.string
}

export default Entry
