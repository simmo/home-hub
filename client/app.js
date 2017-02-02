import React from 'react'
import { render } from 'react-dom'
import AppContainer from 'containers/app'
import { Provider } from 'react-redux'
import store from 'utilities/store'
import 'fullscreen-api-polyfill'

import 'styles/app'

window.console && console.log([
    'HomeHub',
    '=======',
    `Release: ${__RELEASE__}`,
    `Env:     ${__DEV__ ? 'Development' : 'Production'}`
].join('\n'))

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('react')
)
