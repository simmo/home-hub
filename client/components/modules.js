import React from 'react'
import Module from 'components/module'

import 'styles/components/modules'

const Modules = () =>
    <div className="modules">
        <div className="modules__item">
            <Module icon="wifi" title="WiFi" url="/wifi" />
        </div>
        <div className="modules__item">
            <Module icon="light-bulb" title="Lights" url="/lights" />
        </div>
        <div className="modules__item">
            <Module icon="train" title="Trains" url="/trains" />
        </div>
        <div className="modules__item">
            <Module icon="smoke-co" title="Smoke & CO" url="/smoke-co" />
        </div>
    </div>

export default Modules
