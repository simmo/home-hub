import { combineReducers } from 'redux'

import app from './app'
import hue from './hue'
import trains from './trains'
import weather from './weather'
import wifi from './wifi'

export default combineReducers({
    app,
    hue,
    trains,
    weather,
    wifi
})
