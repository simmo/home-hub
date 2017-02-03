import { bindActionCreators } from 'redux'

export const mapDispatchToProps = actions => dispatch => Object.keys(actions).reduce((obj, key) => {
    obj.actions[key] = bindActionCreators(actions[key], dispatch)

    return obj
}, { actions: {} })

export const mapStateToProps = properties => store => properties.reduce((obj, property) => {
    if (store.hasOwnProperty(property)) {
        obj[property] = store[property]
    } else {
        console && console.error(`Cannot read '${property}' in store`)
    }

    return obj
}, {})

export const storeRequiresReload = (store, expiry = 1000 * 60 * 5) => {
    return !store.data || !store.lastUpdated || (expiry && !!store.lastUpdated && Date.now() - store.lastUpdated > expiry)
}

export function createReducer(initialState = [], handlers = {}) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}
