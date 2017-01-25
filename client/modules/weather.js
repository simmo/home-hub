import axios from 'axios'
import { createReducer, storeRequiresReload } from 'utilities/store'

const LOAD               = 'home-hub/weather/LOAD'
const LOAD_PENDING       = 'home-hub/weather/LOAD_PENDING'
const LOAD_FULFILLED     = 'home-hub/weather/LOAD_FULFILLED'
const LOAD_REJECTED      = 'home-hub/weather/LOAD_REJECTED'

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
            data: action.payload.data
        }
    },
    [LOAD_REJECTED](state, action) {
        return {
            ...state,
            isFetching: false,
            lastUpdated: Date.now(),
            error: action.payload.response ? { code: action.payload.response.status, message: action.payload.response.statusText } : { code: 500, message: action.payload.message }
        }
    }
})

export function load(latitude, longitude) {
    if (!latitude || !longitude) {
        throw 'Location is required when loading weather data'
    }

    return (dispatch, getState) => {
        const state = getState()

        if (!storeRequiresReload(state.weather)) {
            return Promise.resolve()
        }

        return dispatch({
            type: LOAD,
            payload: () => axios.get(`/api/weather/${latitude},${longitude}?units=uk2&exclude=flags,alerts`)
        })
    }
}
