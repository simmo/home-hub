import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import promiseCache from 'utilities/middleware/promise'
import thunk from 'redux-thunk'
import reducers from 'modules/reducers'

const middlewares = [thunk, promiseCache()]

if (__DEV__) {
    // Add logging middleware
    middlewares.push(createLogger({
        collapsed: true,
        diff: true,
        actionTransformer: action => ({
            ...action,
            type: String(action.type)
        })
    }))
}

export default createStore(reducers, applyMiddleware(...middlewares))
