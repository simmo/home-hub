import axios from 'axios'
import { createReducer, storeRequiresReload } from 'utilities/store'

const LOAD             = 'home-hub/hue/LOAD'
const LOAD_PENDING     = 'home-hub/hue/LOAD_PENDING'
const LOAD_REJECTED    = 'home-hub/hue/LOAD_REJECTED'
const LOAD_FULFILLED   = 'home-hub/hue/LOAD_FULFILLED'
const UPDATE           = 'home-hub/hue/UPDATE'
const UPDATE_PENDING   = 'home-hub/hue/UPDATE_PENDING'
const UPDATE_REJECTED  = 'home-hub/hue/UPDATE_REJECTED'
const UPDATE_FULFILLED = 'home-hub/hue/UPDATE_FULFILLED'

const initialState = {
    isFetching: false,
    data: null,
    lastUpdated: null,
    error: null
}

export default createReducer(initialState, {
    [LOAD_PENDING](state) {
        return {
            ...state,
            isFetching: true
        }
    },
    [LOAD_FULFILLED](state, action) {
        return {
            ...state,
            isFetching: false,
            lastUpdated: Date.now(),
            data: {
                ...action.payload.data,
                stats: {
                    lights: {
                        on: action.payload.data.lights.reduce((total, light) => total + (light.state.reachable && light.state.on ? 1 : 0), 0),
                        reachable: action.payload.data.lights.reduce((total, light) => total + (light.state.reachable ? 1 : 0), 0),
                        total: action.payload.data.lights.length
                    },
                    rooms: {
                        total: action.payload.data.rooms.length
                    }
                }
            }
        }
    },
    [LOAD_REJECTED](state, action) {
        return {
            ...state,
            isFetching: false,
            lastUpdated: Date.now(),
            error: action.payload.response ? { code: action.payload.response.status, message: action.payload.response.statusText } : { code: 500, message: action.payload.message }
        }
    },
    [UPDATE_PENDING](state) {
        return {
            ...state,
            error: false
        }
    },
    [UPDATE_FULFILLED](state, action) {
        return {
            ...state,
            lastUpdated: Date.now(),
            data: {
                ...state.data,
                lights: state.data.lights.map(light => {
                    if (light.lightId === action.payload.data.lightId) {
                        return {
                            ...light,
                            state: {
                                ...light.state,
                                ...action.payload.data.state
                            }
                        }
                    } else {
                        return light
                    }
                })
            }
        }
    },
    [UPDATE_REJECTED](state, action) {
        return {
            ...state,
            lastUpdated: Date.now(),
            error: action.payload.response ? action.payload.response.statusText : action.payload.message
        }
    }
})

export function load() {
    return (dispatch, getState) => {
        const state = getState()

        if (!storeRequiresReload(state.hue)) {
            return Promise.resolve()
        }

        return dispatch({
            type: LOAD,
            payload: () => axios.get('/api/hue')
        })
    }
}

export function update(path, data) {
    return dispatch => dispatch({
        type: UPDATE,
        payload: () => axios.put(`/api/hue/${path}`, { data }, { responseType: 'json' })
    })
}
